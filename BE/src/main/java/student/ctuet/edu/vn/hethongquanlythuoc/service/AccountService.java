package student.ctuet.edu.vn.hethongquanlythuoc.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.ChangePasswordRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.CreateAccountRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.UpdateAccountRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.AppException;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.ErrorCode;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.AccountRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.RoleResitory;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.StatusAccountRepository;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final RoleResitory roleResitory;
    private final PasswordEncoder passwordEncoder;
    private final StatusAccountRepository statusAccountRepository;

    public AccountService(AccountRepository accountRepository, RoleResitory roleResitory,
            PasswordEncoder passwordEncoder, StatusAccountRepository statusAccountRepository) {
        this.accountRepository = accountRepository;
        this.roleResitory = roleResitory;
        this.passwordEncoder = passwordEncoder;
        this.statusAccountRepository = statusAccountRepository;
    }

    // ========================= CREATE ========================
    public Account createAccount(CreateAccountRequest request) {
        if (accountRepository.existsByUsername(request.username())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }

        if (accountRepository.existsByEmail(request.email())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        Account account = new Account();
        account.setFullname(request.fullname());
        account.setUsername(request.username());
        account.setEmail(request.email());
        account.setPassword(passwordEncoder.encode(request.password()));

        var role = roleResitory.findByRoleName(request.role())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        account.setRole(role);

        var status = statusAccountRepository.findById(1)
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NOT_FOUND));
        account.setStatusAccount(status);

        return accountRepository.save(account);
    }

    // ========================= UPDATE ========================
    public Account updateAccount(long id, UpdateAccountRequest request) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        if (!account.getUsername().equals(request.username()) &&
                accountRepository.existsByUsername(request.username())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }

        if (!account.getEmail().equals(request.email()) &&
                accountRepository.existsByEmail(request.email())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        account.setUsername(request.username());
        account.setFullname(request.fullname());
        account.setEmail(request.email());

        var role = roleResitory.findByRoleName(request.role())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        account.setRole(role);

        return accountRepository.save(account);
    }

    // ========================GET ACCOUNT=========================
    public Account getAccountById(long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
    }

    // ========================= LOCK ACCOUNT =========================
    public Account lockAccount(long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        var lockedStatus = statusAccountRepository.findById(2)
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NOT_FOUND));

        account.setStatusAccount(lockedStatus);
        return accountRepository.save(account);
    }

    // ========================= UNLOCK ACCOUNT =========================
    public Account unlockAccount(long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        var activeStatus = statusAccountRepository.findById(1)
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NOT_FOUND));

        account.setStatusAccount(activeStatus);
        return accountRepository.save(account);
    }

    // ========================= CHANGE PASSWORD =========================
    public Account changePassword(long id, ChangePasswordRequest request) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        if (!request.newPassword().equals(request.confirmPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        account.setPassword(passwordEncoder.encode(request.newPassword()));
        return accountRepository.save(account);
    }

}

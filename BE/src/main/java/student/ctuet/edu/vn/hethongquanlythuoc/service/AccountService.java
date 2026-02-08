package student.ctuet.edu.vn.hethongquanlythuoc.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.CreateAccountRequest;
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

    public Account createAccount(CreateAccountRequest request) {
        if (accountRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        if (accountRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        Account account = new Account();
        account.setFullname(request.fullname());
        account.setUsername(request.username());
        account.setEmail(request.email());
        account.setPassword(passwordEncoder.encode(request.password()));

        var role = roleResitory.findByRoleName(request.role())
                .orElseThrow(() -> new RuntimeException("Vai trò không tồn tại"));
        account.setRole(role);

        var status = statusAccountRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Trạng thái tài khoản không tồn tại"));
        account.setStatusAccount(status);

        return accountRepository.save(account);
    }

}

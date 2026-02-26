package student.ctuet.edu.vn.hethongquanlythuoc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.AccountResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.UpdateAccountRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.service.AccountService;
import student.ctuet.edu.vn.hethongquanlythuoc.utils.ApiResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.CreateAccountRequest;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping // Create Account
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(
            @Valid @RequestBody CreateAccountRequest request) {
        Account account = accountService.createAccount(request);

        AccountResponse response = new AccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getNameStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo tài khoản thành công", response));

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> updateAccount(
            @PathVariable long id,
            @Valid @RequestBody UpdateAccountRequest request) {
        Account account = accountService.updateAccount(id, request);

        AccountResponse response = new AccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getNameStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());

        return ResponseEntity
                .ok(ApiResponse.success("Cập nhật tài khoản thành công", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccount(@PathVariable long id) {
        Account account = accountService.getAccountById(id);

        AccountResponse response = new AccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getNameStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());

        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin tài khoản thành công", response));
    }

    @PatchMapping("/{id}/lock")
    public ResponseEntity<ApiResponse<AccountResponse>> lockAccount(@PathVariable long id) {
        Account account = accountService.lockAccount(id);
        AccountResponse response = new AccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getNameStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());
        return ResponseEntity.ok(ApiResponse.success("Khóa tài khoản thành công", response));
    }

    @PatchMapping("/{id}/unlock")
    public ResponseEntity<ApiResponse<AccountResponse>> unlockAccount(@PathVariable long id) {
        Account account = accountService.unlockAccount(id);
        AccountResponse response = new AccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getNameStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());
        return ResponseEntity.ok(ApiResponse.success("Mở khóa tài khoản thành công", response));
    }
}

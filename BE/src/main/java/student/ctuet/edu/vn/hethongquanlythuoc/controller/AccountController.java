package student.ctuet.edu.vn.hethongquanlythuoc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.CreateAccountResponse;
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
    public ResponseEntity<ApiResponse<CreateAccountResponse>> createAccount(
            @Valid @RequestBody CreateAccountRequest request) {
        Account account = accountService.createAccount(request);

        CreateAccountResponse response = new CreateAccountResponse(
                account.getId(),
                account.getFullname(),
                account.getUsername(),
                account.getEmail(),
                account.getRole().getRoleName(),
                account.getStatusAccount().getStatusAccount(),
                account.getCreatedAt(),
                account.getUpdatedAt());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo tài khoản thành công", response));

    }
}

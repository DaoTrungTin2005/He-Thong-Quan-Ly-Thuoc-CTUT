package student.ctuet.edu.vn.hethongquanlythuoc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth.LoginRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth.LoginResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth.LogoutRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth.RefreshTokenRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.service.AuthService;
import student.ctuet.edu.vn.hethongquanlythuoc.utils.ApiResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success("Làm mới token thành công", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @Valid @RequestBody LogoutRequest request) {
        authService.logout(request);
        return ResponseEntity.ok(ApiResponse.success("Đăng xuất thành công", null));
    }
}
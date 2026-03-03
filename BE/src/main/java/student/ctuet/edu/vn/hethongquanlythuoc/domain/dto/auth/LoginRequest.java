package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Không được để trống tên đăng nhập hoặc email") String usernameOrEmail,

        @NotBlank(message = "Không được để trống mật khẩu") String password) {
}
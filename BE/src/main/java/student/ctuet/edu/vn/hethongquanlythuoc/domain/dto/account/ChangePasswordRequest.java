package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordRequest(
        @NotBlank(message = "Mật khẩu không được để trống") String newPassword,
        @NotBlank(message = "Xác nhận mật khẩu không được để trống") String confirmPassword) {
}

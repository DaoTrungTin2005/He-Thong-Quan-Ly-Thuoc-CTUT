package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateAccountRequest(

        @NotBlank(message = "Tên người dùng không được để trống") String fullname,

        @NotBlank(message = "Email không được để trống") @Email(message = "Email không hợp lệ") String email,

        @NotBlank(message = "Tên đăng nhập không được để trống") String username,

        @NotBlank(message = "Mật khẩu không được để trống") String password,

        @NotBlank(message = "Vui lòng chọn vai trò") String role

) {
}

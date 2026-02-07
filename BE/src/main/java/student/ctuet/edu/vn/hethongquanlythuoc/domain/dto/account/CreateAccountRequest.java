package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CreateAccountRequest {
    @NotBlank(message = "Tên người dùng không được để trống")
    String ten_nguoi_dung;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    String email;

    @NotBlank(message = "Tên đăng nhập không được để trống")
    String ten_dang_nhap;

    @NotBlank(message = "Mật khẩu không được để trống")
    String mat_khau;

    @NotBlank(message = "Vui lòng chọn vai trò")
    String vai_tro;
}

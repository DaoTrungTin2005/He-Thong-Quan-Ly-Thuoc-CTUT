package student.ctuet.edu.vn.hethongquanlythuoc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Account
    USERNAME_EXISTED(HttpStatus.BAD_REQUEST, "Tên đăng nhập đã tồn tại"),
    EMAIL_EXISTED(HttpStatus.BAD_REQUEST, "Email đã tồn tại"),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại"),

    // Role
    ROLE_NOT_FOUND(HttpStatus.NOT_FOUND, "Vai trò không tồn tại"),

    // Status
    STATUS_NOT_FOUND(HttpStatus.NOT_FOUND, "Trạng thái tài khoản không tồn tại"),

    //Validation
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Dữ liệu không hợp lệ"),

    // System
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi hệ thống");

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
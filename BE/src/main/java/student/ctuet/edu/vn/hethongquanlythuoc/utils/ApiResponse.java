package student.ctuet.edu.vn.hethongquanlythuoc.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private final ResponseStatus status;
    private final String message;
    private final String errorCode;
    private final T data;
    private final LocalDateTime timestamp;

    private ApiResponse(ResponseStatus status, String message, String errorCode, T data) {
        this.status = status; // success / error
        this.message = message;
        this.errorCode = errorCode;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(ResponseStatus.SUCCESS, message, null, data);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(ResponseStatus.SUCCESS, message, null, null);
    }

    public static <T> ApiResponse<T> error(String message, String errorCode, T data) {
        return new ApiResponse<>(ResponseStatus.ERROR, message, errorCode, data);
    }

    public static <T> ApiResponse<T> error(String message, String errorCode) {
        return new ApiResponse<>(ResponseStatus.ERROR, message, errorCode, null);
    }
}
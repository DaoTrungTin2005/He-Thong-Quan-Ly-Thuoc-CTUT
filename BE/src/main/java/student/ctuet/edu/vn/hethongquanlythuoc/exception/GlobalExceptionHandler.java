package student.ctuet.edu.vn.hethongquanlythuoc.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import student.ctuet.edu.vn.hethongquanlythuoc.utils.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // Business Logic + Not Found
        @ExceptionHandler(AppException.class)
        public ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
                return ResponseEntity
                                .status(e.getErrorCode().getHttpStatus())
                                .body(ApiResponse.error(e.getErrorCode().getMessage(), e.getErrorCode().name()));
        }

        // Validation (@Valid)
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Void>> handleValidationException(MethodArgumentNotValidException e) {
                List<String> errors = e.getBindingResult().getFieldErrors()
                                .stream()
                                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                                .collect(Collectors.toList());

                String message = errors.isEmpty() ? "Dữ liệu không hợp lệ" : String.join(", ", errors);

                return ResponseEntity
                                .badRequest()
                                .body(ApiResponse.error(message, ErrorCode.VALIDATION_ERROR.name()));
        }

        // System Exception
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
                return ResponseEntity
                                .internalServerError()
                                .body(ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(),
                                                ErrorCode.INTERNAL_SERVER_ERROR.name()));
        }

        // Access Denied
        @ExceptionHandler(AuthorizationDeniedException.class)
        public ResponseEntity<ApiResponse<Void>> handleAccessDenied(AuthorizationDeniedException e) {
                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(ApiResponse.error("Không có quyền thực hiện thao tác này", "ACCESS_DENIED"));
        }
}
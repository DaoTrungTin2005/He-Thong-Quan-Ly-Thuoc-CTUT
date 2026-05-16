package student.ctuet.edu.vn.hethongquanlythuoc.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        // super(errorCode.getMessage()) calls the parent class (RuntimeException)
        // constructor and passes the message to it, so the exception can store and
        // return that message later using getMessage()

        super(errorCode.getMessage());
        this.errorCode = errorCode; // Store the error code in the AppException instance for later retrieval
                                    // (GlobalExceptionHandler)
    }
}
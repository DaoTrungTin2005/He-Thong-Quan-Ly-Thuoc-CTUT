package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LogoutRequest(
        @NotBlank(message = "Access token không được để trống") String accessToken,

        @NotBlank(message = "Refresh token không được để trống") String refreshToken) {
}
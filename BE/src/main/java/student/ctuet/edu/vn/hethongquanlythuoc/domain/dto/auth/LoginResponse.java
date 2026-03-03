package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.auth;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account.AccountResponse;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long accessExpiresIn,
        AccountResponse account) {
}
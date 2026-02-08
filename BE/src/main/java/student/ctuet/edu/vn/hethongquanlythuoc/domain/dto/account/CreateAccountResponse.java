package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account;

import java.time.Instant;

public record CreateAccountResponse(
        long id,
        String fullname,
        String username,
        String email,
        String role,
        String status,
        Instant createdAt,
        Instant updatedAt

) {
}

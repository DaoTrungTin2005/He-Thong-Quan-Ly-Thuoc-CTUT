package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.account;

public record CreateAccountResponse(
        long id,
        String fullname,
        String username,
        String email,
        String role

) {
}

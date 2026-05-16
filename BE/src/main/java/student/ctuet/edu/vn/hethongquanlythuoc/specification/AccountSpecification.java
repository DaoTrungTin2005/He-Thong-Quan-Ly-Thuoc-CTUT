package student.ctuet.edu.vn.hethongquanlythuoc.specification;

import org.springframework.data.jpa.domain.Specification;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;

public class AccountSpecification {

    public static Specification<Account> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank())
                return null;
            String pattern = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("username")), pattern), // so sánh với pattern bằng like
                    cb.like(cb.lower(root.get("fullname")), pattern),
                    cb.like(cb.lower(root.get("email")), pattern));
        };
    }

    public static Specification<Account> hasRole(String role) {
        return (root, query, cb) -> {
            if (role == null || role.isBlank())
                return null;
            return cb.equal(root.join("role").get("roleName"), role);
        };
    }

    public static Specification<Account> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isBlank())
                return null;
            return cb.equal(root.join("statusAccount").get("statusName"), status);
        };
    }
}
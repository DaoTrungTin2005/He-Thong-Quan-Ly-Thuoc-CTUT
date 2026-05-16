package student.ctuet.edu.vn.hethongquanlythuoc.specification;

import org.springframework.data.jpa.domain.Specification;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;

public class MedicineSpecification {

    public static Specification<Medicine> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank())
                return null;
            String pattern = "%" + keyword.toLowerCase() + "%";
            return cb.like(cb.lower(root.get("name")), pattern);
        };
    }

    public static Specification<Medicine> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isBlank())
                return null;
            return cb.equal(root.join("status").get("name"), status);
        };
    }
}
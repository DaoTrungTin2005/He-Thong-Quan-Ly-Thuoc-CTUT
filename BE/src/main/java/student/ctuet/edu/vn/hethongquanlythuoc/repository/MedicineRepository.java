package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    boolean existsByName(String name);
}
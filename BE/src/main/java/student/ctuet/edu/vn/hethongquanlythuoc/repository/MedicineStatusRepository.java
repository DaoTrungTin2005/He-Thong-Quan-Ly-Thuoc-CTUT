package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineStatus;

public interface MedicineStatusRepository extends JpaRepository<MedicineStatus, Integer> {
}
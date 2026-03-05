package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineBatch;

public interface MedicineBatchRepository extends JpaRepository<MedicineBatch, Long> {

    int countByMedicineId(long medicineId);

    List<MedicineBatch> findByMedicineId(long medicineId);
}
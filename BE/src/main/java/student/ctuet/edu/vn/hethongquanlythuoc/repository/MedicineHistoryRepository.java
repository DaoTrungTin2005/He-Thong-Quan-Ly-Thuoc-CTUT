package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineHistory;

public interface MedicineHistoryRepository  extends JpaRepository<MedicineHistory, Long> {

    
} 
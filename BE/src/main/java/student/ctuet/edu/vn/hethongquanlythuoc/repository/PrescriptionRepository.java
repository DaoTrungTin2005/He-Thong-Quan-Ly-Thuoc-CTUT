package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, String> {

    @Query("SELECT COUNT(p) FROM Prescription p WHERE p.prescriptionCode LIKE :prefix%")
    long countByCodePrefix(String prefix);
}
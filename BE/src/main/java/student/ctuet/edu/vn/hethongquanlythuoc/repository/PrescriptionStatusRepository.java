package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.PrescriptionStatus;

public interface PrescriptionStatusRepository extends JpaRepository<PrescriptionStatus, Long> {
    Optional<PrescriptionStatus> findByStatusName(String statusName);
}
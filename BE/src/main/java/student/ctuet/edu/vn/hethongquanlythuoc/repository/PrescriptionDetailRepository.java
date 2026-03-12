package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.PrescriptionDetail;

public interface PrescriptionDetailRepository extends JpaRepository<PrescriptionDetail, Long> {
    List<PrescriptionDetail> findByPrescriptionPrescriptionCode(String prescriptionCode);
}
package student.ctuet.edu.vn.hethongquanlythuoc.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineBatch;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineHistory;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Prescription;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.PrescriptionDetail;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.PrescriptionStatus;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.Student;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.prescription.CreatePrescriptionRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.prescription.PrescriptionResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.AppException;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.ErrorCode;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.AccountRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineBatchRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineHistoryRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.PrescriptionDetailRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.PrescriptionRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.PrescriptionStatusRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.StudentRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionDetailRepository detailRepository;
    private final PrescriptionStatusRepository statusRepository;
    private final StudentRepository studentRepository;
    private final AccountRepository accountRepository;
    private final MedicineRepository medicineRepository;
    private final MedicineBatchRepository batchRepository;
    private final MedicineHistoryRepository historyRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
            PrescriptionStatusRepository statusRepository,
            PrescriptionDetailRepository detailRepository,
            StudentRepository studentRepository,
            AccountRepository accountRepository,
            MedicineRepository medicineRepository,
            MedicineBatchRepository batchRepository,
            MedicineHistoryRepository historyRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.statusRepository = statusRepository;
        this.detailRepository = detailRepository;
        this.studentRepository = studentRepository;
        this.accountRepository = accountRepository;
        this.medicineRepository = medicineRepository;
        this.batchRepository = batchRepository;
        this.historyRepository = historyRepository;
        
    }

    // ========================= TẠO ĐƠN =========================
    @Transactional
    public PrescriptionResponse createPrescription(CreatePrescriptionRequest request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        Student student = studentRepository.findByStudentCode(request.studentCode())
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));

        PrescriptionStatus status = statusRepository.findByStatusName("Chờ thuốc")
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NOT_FOUND));

        Prescription prescription = new Prescription();
        prescription.setPrescriptionCode(generateCode());
        prescription.setStudent(student);
        prescription.setAccount(account);
        prescription.setStatus(status);
        prescription.setDiagnosis(request.diagnosis());
        prescription.setNote(request.note());

        List<PrescriptionDetail> details = request.details().stream().map(item -> {
                
            Medicine medicine = medicineRepository.findById(item.medicineId())
                    .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_FOUND));

            PrescriptionDetail detail = new PrescriptionDetail();
            detail.setPrescription(prescription);
            detail.setMedicine(medicine);
            detail.setQuantity(item.quantity());
            detail.setUnit(medicine.getUnit());
            return detail;
        }).toList();

        prescription.setDetails(details);
        Prescription saved = prescriptionRepository.save(prescription); 
        return mapToResponse(saved);
    }

    // ========================= GENERATE MÃ ĐƠN =========================
    private String generateCode() {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        String prefix = "CTUT" + dateStr;
        long count = prescriptionRepository.countByCodePrefix(prefix);
        return String.format("%s-%03d", prefix, count + 1);
    }

    // ========================= MAP TO RESPONSE =========================
    private PrescriptionResponse mapToResponse(Prescription p) {

        List<PrescriptionResponse.DetailResponse> details = detailRepository
                .findByPrescriptionPrescriptionCode(p.getPrescriptionCode())
                .stream()
                .map(d -> new PrescriptionResponse.DetailResponse(
                        d.getId(),
                        d.getMedicine().getId(),
                        d.getMedicine().getName(),
                        d.getUnit(),
                        d.getQuantity()))
                .toList();

        return new PrescriptionResponse(
                p.getPrescriptionCode(),
                p.getStudent().getStudentCode(),
                p.getStudent().getLastName() + " " + p.getStudent().getFirstName(),
                p.getStudent().getClassCode(),
                p.getStudent().getInsuranceCode(),
                p.getDiagnosis(),
                p.getNote(),
                p.getStatus().getStatusName(),
                p.getCreatedAt(),
                details);
    }
}

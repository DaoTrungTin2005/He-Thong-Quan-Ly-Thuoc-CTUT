package student.ctuet.edu.vn.hethongquanlythuoc.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineBatch;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.CreateMedicineRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.MedicineResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.AppException;
import student.ctuet.edu.vn.hethongquanlythuoc.exception.ErrorCode;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineBatchRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineStatusRepository;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineBatchRepository batchRepository;
    private final MedicineStatusRepository medicineStatusRepository;

    public MedicineService(
            MedicineRepository medicineRepository,
            MedicineBatchRepository batchRepository,
            MedicineStatusRepository medicineStatusRepository) {
        this.medicineRepository = medicineRepository;
        this.batchRepository = batchRepository;
        this.medicineStatusRepository = medicineStatusRepository;
    }

    // ========================= CREATE =========================
    @Transactional
    public MedicineResponse createMedicine(CreateMedicineRequest request) {

        if (medicineRepository.existsByName(request.name())) {
            throw new AppException(ErrorCode.MEDICINE_NAME_EXISTED);
        }

        var status = medicineStatusRepository.findById(1)
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_STATUS_NOT_FOUND));

        Medicine medicine = new Medicine();
        medicine.setName(request.name());
        medicine.setUnit(request.unit());
        medicine.setStatus(status);
        medicine = medicineRepository.save(medicine);

        String prefix = request.name().length() >= 3
                ? request.name().substring(0, 3).toUpperCase()
                : request.name().toUpperCase();

        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));

        int batchCount = batchRepository.countByMedicineId(medicine.getId());
        String batchNumber = String.format("%s-%s-%03d", prefix, date, batchCount + 1);

        MedicineBatch batch = new MedicineBatch();
        batch.setMedicine(medicine);
        batch.setBatchNumber(batchNumber);
        batch.setQuantity(request.quantity());
        batch.setRemainingQuantity(request.quantity());
        batch.setExpiryDate(request.expiryDate());
        batchRepository.save(batch);

        return maptoResponse(medicine);
    }

    // ========================= HELPER =========================
    private MedicineResponse maptoResponse(Medicine medicine) {
        List<MedicineResponse.MedicineBatch> batches = batchRepository
                .findByMedicineId(medicine.getId())
                .stream()
                .map(b -> new MedicineResponse.MedicineBatch(
                        b.getId(),
                        b.getBatchNumber(),
                        b.getQuantity(),
                        b.getRemainingQuantity(),
                        b.getExpiryDate(),
                        b.getCreatedAt(),
                        b.getUpdatedAt(),
                        b.hasBeenExported()))
                .toList();

        int totalQuantity = batches.stream()
                .mapToInt(MedicineResponse.MedicineBatch::remainingQuantity)
                .sum();

        return new MedicineResponse(
                medicine.getId(),
                medicine.getName(),
                medicine.getUnit(),
                medicine.getStatus().getName(),
                totalQuantity,
                medicine.getCreatedAt(),
                medicine.getUpdatedAt(),
                batches);
    }
}
package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record MedicineResponse(
        long id,
        String name,
        String unit,
        String status,
        int totalQuantity,
        Instant createdAt,
        Instant updatedAt,
        List<MedicineBatch> batches) {
    public record MedicineBatch(
            long id,
            String batchNumber,
            int quantity,
            int remainingQuantity,
            LocalDate expiryDate,
            Instant createdAt,
            Instant updatedAt,
            boolean hasBeenExported) {
    }
}
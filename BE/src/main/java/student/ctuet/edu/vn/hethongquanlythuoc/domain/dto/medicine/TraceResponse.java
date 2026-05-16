package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine;

import java.time.Instant;
import java.util.List;

public record TraceResponse(
        String medicineName,
        String unit,
        int remainingQuantity,
        int totalImport,
        int totalExport,
        List<HistoryItem> histories) {
    public record HistoryItem(
            Instant createdAt,
            Integer quantity,
            String unit,
            String type) {
    }
}
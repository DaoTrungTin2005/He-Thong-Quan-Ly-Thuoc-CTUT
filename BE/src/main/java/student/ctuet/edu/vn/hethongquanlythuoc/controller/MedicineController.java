package student.ctuet.edu.vn.hethongquanlythuoc.controller;

import java.time.LocalDate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.CreateMedicineRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.ImportBatchRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.MedicineResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.TraceResponse;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine.UpdateBatchRequest;
import student.ctuet.edu.vn.hethongquanlythuoc.service.ExportService;
import student.ctuet.edu.vn.hethongquanlythuoc.service.MedicineService;
import student.ctuet.edu.vn.hethongquanlythuoc.utils.ApiResponse;

@RestController
@RequestMapping("/api/v1/medicines")
public class MedicineController {

    private final MedicineService medicineService;
    private final ExportService exportService;

    public MedicineController(MedicineService medicineService, ExportService exportService) {
        this.medicineService = medicineService;
        this.exportService = exportService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> createMedicine(
            @Valid @RequestBody CreateMedicineRequest request) {

        MedicineResponse response = medicineService.createMedicine(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thêm thuốc mới thành công", response));
    }

    @PostMapping("/{medicineId}/batches")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> importBatch(
            @PathVariable long medicineId,
            @Valid @RequestBody ImportBatchRequest request) {

        MedicineResponse response = medicineService.importBatch(medicineId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Nhập thuốc thành công", response));
    }

    @PutMapping("/{medicineId}/batches/{batchId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> updateBatch(
            @PathVariable long medicineId,
            @PathVariable long batchId,
            @Valid @RequestBody UpdateBatchRequest request) {

        MedicineResponse response = medicineService.updateBatch(medicineId, batchId, request);

        return ResponseEntity
                .ok(ApiResponse.success("Cập nhật thuốc thành công", response));
    }

    @DeleteMapping("/batches/{batchId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteBatch(@PathVariable long batchId) {

        medicineService.deleteBatch(batchId);

        return ResponseEntity
                .ok(ApiResponse.success("Xóa lô thuốc thành công", null));
    }

    @PatchMapping("/{medicineId}/lock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> lockMedicine(@PathVariable long medicineId) {
        MedicineResponse response = medicineService.lockMedicine(medicineId);
        return ResponseEntity.ok(ApiResponse.success("Khóa thuốc thành công", response));
    }

    @PatchMapping("/{medicineId}/unlock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> unlockMedicine(@PathVariable long medicineId) {
        MedicineResponse response = medicineService.unlockMedicine(medicineId);
        return ResponseEntity.ok(ApiResponse.success("Mở khóa thuốc thành công", response));
    }

    @GetMapping("/batches/{batchId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MedicineResponse>> getMedicineByBatchId(@PathVariable long batchId) {
        MedicineResponse response = medicineService.getMedicineByBatchId(batchId);
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin thuốc theo lô thành công", response));
    }

    @GetMapping("/{medicineId}/trace")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<TraceResponse>> traceMedicine(
            @PathVariable long medicineId,
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to) {

        LocalDate fromDate = (from != null) ? from : LocalDate.now().withDayOfYear(1);
        LocalDate toDate = (to != null) ? to : LocalDate.now();

        TraceResponse response = medicineService.traceMedicine(medicineId, fromDate, toDate);
        return ResponseEntity.ok(ApiResponse.success("Truy xuất thành công", response));
    }

    @GetMapping("/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> exportReport(
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to) throws Exception {

        LocalDate fromDate = (from != null) ? from : LocalDate.now().withDayOfYear(1);
        LocalDate toDate = (to != null) ? to : LocalDate.now();

        byte[] file = exportService.exportMedicineReport(fromDate, toDate);

        String filename = "bao-cao-thuoc-" + fromDate + "-den-" + toDate + ".xlsx";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}
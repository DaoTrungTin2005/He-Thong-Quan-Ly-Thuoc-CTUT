package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine;

import java.time.LocalDate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateBatchRequest(

        @NotBlank(message = "Tên thuốc không được để trống") String name,

        @NotBlank(message = "Đơn vị tính không được để trống") String unit,

        @NotNull(message = "Số lượng không được để trống") @Min(value = 1, message = "Số lượng phải lớn hơn 0") Integer quantity,

        @NotNull(message = "Hạn sử dụng không được để trống") LocalDate expiryDate) {
}
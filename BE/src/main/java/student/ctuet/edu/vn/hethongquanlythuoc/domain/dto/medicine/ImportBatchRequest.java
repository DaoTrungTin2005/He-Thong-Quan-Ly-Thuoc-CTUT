package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.medicine;

import java.time.LocalDate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ImportBatchRequest(

        @NotNull(message = "Số lượng không được để trống") @Min(value = 1, message = "Số lượng phải lớn hơn 0") Integer quantity,

        @NotNull(message = "Hạn sử dụng không được để trống") LocalDate expiryDate) {
}
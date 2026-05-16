package student.ctuet.edu.vn.hethongquanlythuoc.domain.dto.student;

import java.time.LocalDate;

public record StudentResponse(
        String studentCode,
        String fullName,
        LocalDate dateOfBirth,
        String gender,
        String insuranceCode,
        String classCode,
        String faculty) {
}
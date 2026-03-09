package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "sinh_vien")
public class Student {

    @Id
    @Column(name = "ma_sinh_vien")
    private String studentCode;

    @Column(name = "ho")
    private String lastName;

    @Column(name = "ten")
    private String firstName;

    @Column(name = "ngay_sinh")
    private LocalDate dateOfBirth;

    @Column(name = "gioi_tinh")
    private String gender;

    @Column(name = "ma_bhyt")
    private String insuranceCode;

    @Column(name = "ma_lop")
    private String classCode;

    @Column(name = "khoa")
    private String faculty;

    @Column(name = "thoi_diem_tao", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "thoi_diem_cap_nhat", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
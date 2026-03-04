package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "lo_thuoc")
@Getter
@Setter
public class MedicineBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_lo_thuoc")
    private long id;

    @ManyToOne
    @JoinColumn(name = "ma_thuoc", nullable = false)
    private Medicine medicine;

    @Column(name = "so_lo_thuoc", nullable = false)
    private String batchNumber;

    @Column(name = "so_luong", nullable = false)
    private Integer quantity;

    @Column(name = "so_luong_con_lai", nullable = false)
    private Integer remainingQuantity;

    @Column(name = "ngay_het_han", nullable = false)
    private LocalDate expiryDate;

    @OneToMany(mappedBy = "batch")
    private List<MedicineHistory> histories;

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

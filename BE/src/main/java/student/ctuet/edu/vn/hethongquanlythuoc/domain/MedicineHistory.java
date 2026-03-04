package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "lich_su_nhap_xuat")
@Getter
@Setter
public class MedicineHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_lich_su")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ma_lo_thuoc", nullable = false)
    private MedicineBatch batch;

    @ManyToOne
    @JoinColumn(name = "ma_tai_khoan", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(name = "thao_tac", nullable = false)
    private HistoryType type;

    @Column(name = "so_luong", nullable = false)
    private Integer quantity;

    @Column(name = "thoi_diem_tao", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }

    public enum HistoryType {
        IMPORT,
        EXPORT
    }
}
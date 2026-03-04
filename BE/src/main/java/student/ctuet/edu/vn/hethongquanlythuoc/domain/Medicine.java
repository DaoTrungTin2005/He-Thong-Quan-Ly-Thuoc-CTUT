package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Getter
@Setter
@Table(name = "thuoc")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_thuoc")
    private long id;

    @Column(name = "ten_thuoc", nullable = false, unique = true)
    private String name;

    @Column(name = "don_vi", nullable = false)
    private String unit;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private MedicineStatus status;

    @OneToMany(mappedBy = "medicine")
    private List<MedicineBatch> batches;

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

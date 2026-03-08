package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "trang_thai_thuoc")
@Getter
@Setter
public class MedicineStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_trang_thai_thuoc")
    private long id;

    @Column(name = "ten_trang_thai_thuoc", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "status")
    private List<Medicine> medicines;
}

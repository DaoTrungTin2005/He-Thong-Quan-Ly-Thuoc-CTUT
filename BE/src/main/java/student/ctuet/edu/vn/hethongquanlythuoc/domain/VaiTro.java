package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vai_tro")
public class VaiTro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_vai_tro")
    private Long maVaiTro;

    @Column(nullable = false, unique = true, name = "ten_vai_tro")
    private String tenVaiTro;

    private String moTa;

    @OneToMany(mappedBy = "vaiTro")
    private List<TaiKhoan> taiKhoans;
}

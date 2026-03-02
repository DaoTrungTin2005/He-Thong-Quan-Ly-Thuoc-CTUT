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
@Table(name = "trang_thai_tai_khoan")
public class StatusAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_trang_thai_tai_khoan")
    private long id;

    @Column(nullable = false, unique = true, name = "trang_thai_tai_khoan")
    private String statusAccountName;

    @OneToMany(mappedBy = "statusAccount")
    private List<Account> accounts;

}

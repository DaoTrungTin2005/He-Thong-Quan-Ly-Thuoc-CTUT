package student.ctuet.edu.vn.hethongquanlythuoc.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tai_khoan")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tai_khoan")
    private long id;

    @Column(nullable = false, unique = true, name = "ten_dang_nhap")
    private String username;

    @Column(name = "ten_nguoi_dung")
    private String fullname;

    @Column(nullable = false, name = "mat_khau")
    private String password;

    @Column(nullable = false, name = "email", unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "ma_vai_tro", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "ma_trang_thai_tai_khoan", nullable = false)
    private StatusAccount statusAccount;
}

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
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_vai_tro")
    private long id;

    @Column(nullable = false, unique = true, name = "ten_vai_tro")
    private String roleName;

    @Column(name = "mo_ta")
    private String roleDescription;

    @OneToMany(mappedBy = "role")
    private List<Account> accounts;
}

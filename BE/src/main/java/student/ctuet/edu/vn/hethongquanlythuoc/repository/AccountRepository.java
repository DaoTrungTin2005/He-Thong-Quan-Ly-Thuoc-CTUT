package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Long>,JpaSpecificationExecutor<Account> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

}

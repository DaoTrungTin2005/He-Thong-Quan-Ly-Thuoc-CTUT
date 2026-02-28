package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.StatusAccount;

public interface StatusAccountRepository extends JpaRepository<StatusAccount, Long> {
    Optional<StatusAccount> findById(long id);

}
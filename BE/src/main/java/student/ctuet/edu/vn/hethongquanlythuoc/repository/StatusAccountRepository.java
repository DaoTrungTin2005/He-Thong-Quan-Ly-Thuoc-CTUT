package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.AccountStatus;

public interface StatusAccountRepository extends JpaRepository<AccountStatus, Long> {
    Optional<AccountStatus> findById(long id);

}
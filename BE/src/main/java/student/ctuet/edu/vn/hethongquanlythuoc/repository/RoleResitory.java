package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Role;

public interface RoleResitory extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);

}

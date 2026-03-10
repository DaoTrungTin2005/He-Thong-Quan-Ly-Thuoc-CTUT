package student.ctuet.edu.vn.hethongquanlythuoc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Student;

public interface StudentRepository extends JpaRepository<Student, String> {

    Optional<Student> findByStudentCode(String studentCode);

}
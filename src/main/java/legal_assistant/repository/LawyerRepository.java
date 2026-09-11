package legal_assistant.repository;

import legal_assistant.entity.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LawyerRepository extends JpaRepository<Lawyer, Long> {

    List<Lawyer> findBySpecializationIgnoreCase(String specialization);

    List<Lawyer> findByLocationIgnoreCase(String location);

    Optional<Lawyer> findByEmail(String email);
}
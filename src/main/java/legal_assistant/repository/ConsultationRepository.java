package legal_assistant.repository;

import legal_assistant.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    List<Consultation> findByUserId(Long userId);

    List<Consultation> findByLawyerId(Long lawyerId);

    List<Consultation> findByStatus(String status);
}
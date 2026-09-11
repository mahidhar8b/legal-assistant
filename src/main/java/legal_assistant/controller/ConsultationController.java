package legal_assistant.controller;

import legal_assistant.entity.Consultation;
import legal_assistant.repository.ConsultationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationRepository consultationRepository;

    public ConsultationController(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    // Create a consultation request
    @PostMapping
    public Consultation createConsultation(
            @RequestBody Consultation consultation) {

        consultation.setStatus("PENDING");

        return consultationRepository.save(consultation);
    }

    // Get all consultation requests
    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    // Get consultations made by a particular user
    @GetMapping("/user/{userId}")
    public List<Consultation> getByUser(
            @PathVariable Long userId) {

        return consultationRepository.findByUserId(userId);
    }

    // Get consultations received by a particular lawyer
    @GetMapping("/lawyer/{lawyerId}")
    public List<Consultation> getByLawyer(
            @PathVariable Long lawyerId) {

        return consultationRepository.findByLawyerId(lawyerId);
    }

    // Accept consultation
    @PutMapping("/{id}/accept")
    public Consultation acceptConsultation(
            @PathVariable Long id) {

        Consultation consultation =
                consultationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Consultation not found"));

        consultation.setStatus("ACCEPTED");

        return consultationRepository.save(consultation);
    }

    // Reject consultation
    @PutMapping("/{id}/reject")
    public Consultation rejectConsultation(
            @PathVariable Long id) {

        Consultation consultation =
                consultationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Consultation not found"));

        consultation.setStatus("REJECTED");

        return consultationRepository.save(consultation);
    }
}
package legal_assistant.controller;

import legal_assistant.entity.Lawyer;
import legal_assistant.repository.LawyerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
public class LawyerController {

    private final LawyerRepository lawyerRepository;

    public LawyerController(LawyerRepository lawyerRepository) {
        this.lawyerRepository = lawyerRepository;
    }

    // Get all lawyers
    @GetMapping
    public List<Lawyer> getAllLawyers() {
        return lawyerRepository.findAll();
    }

    // Get lawyer by ID
    @GetMapping("/{id}")
    public Lawyer getLawyerById(@PathVariable Long id) {
        return lawyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lawyer not found"));
    }

    // Add a lawyer
    @PostMapping
    public Lawyer addLawyer(@RequestBody Lawyer lawyer) {
        return lawyerRepository.save(lawyer);
    }

    // Search by specialization
    @GetMapping("/specialization/{specialization}")
    public List<Lawyer> getBySpecialization(
            @PathVariable String specialization) {

        return lawyerRepository
                .findBySpecializationIgnoreCase(specialization);
    }

    // Search by location
    @GetMapping("/location/{location}")
    public List<Lawyer> getByLocation(
            @PathVariable String location) {

        return lawyerRepository
                .findByLocationIgnoreCase(location);
    }
}
package legal_assistant.controller;

import legal_assistant.entity.Lawyer;
import legal_assistant.service.LawyerAuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/lawyer-auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LawyerAuthController {

    private final LawyerAuthService lawyerAuthService;

    public LawyerAuthController(
            LawyerAuthService lawyerAuthService) {

        this.lawyerAuthService = lawyerAuthService;
    }

    @PostMapping("/register")
    public Lawyer register(
            @RequestBody Lawyer lawyer) {

        return lawyerAuthService.register(lawyer);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody Map<String, String> request) {

        return lawyerAuthService.login(
                request.get("email"),
                request.get("password")
        );
    }
}
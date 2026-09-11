package legal_assistant.controller;

import legal_assistant.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assistant")
@CrossOrigin(origins = "http://localhost:5173")
public class AssistantController {

    private final GeminiService geminiService;

    public AssistantController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public Map<String, String> askAssistant(
            @RequestBody Map<String, String> request) {

        String message = request.get("message");

        if (message == null || message.trim().isEmpty()) {
            return Map.of(
                    "response",
                    "Please enter a legal question."
            );
        }

        try {

            String response =
                    geminiService.askGemini(message);

            return Map.of(
                    "response",
                    response
            );

        } catch (Exception e) {

            e.printStackTrace();

            return Map.of(
                    "response",
                    "Sorry, I am unable to connect to the AI service right now. "
                    + "Please try again later."
            );
        }
    }
}
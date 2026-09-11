package legal_assistant.controller;

import legal_assistant.dto.LegalCasePredictionRequest;
import legal_assistant.service.PredictionService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping
    public Map<String, Object> predictCase(
            @RequestBody LegalCasePredictionRequest request) {

        return predictionService.predict(request);
    }
}
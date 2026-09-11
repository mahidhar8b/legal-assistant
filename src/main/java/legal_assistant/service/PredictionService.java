package legal_assistant.service;

import legal_assistant.dto.LegalCasePredictionRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PredictionService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> predict(
            LegalCasePredictionRequest request) {

        String pythonApiUrl =
                "http://127.0.0.1:8000/predict";

        Map<String, Object> response =
                restTemplate.postForObject(
                        pythonApiUrl,
                        request,
                        Map.class
                );

        return response;
    }
}
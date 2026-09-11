package legal_assistant.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService() {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException(
                    "GEMINI_API_KEY environment variable is not set."
            );
        }

        client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String askGemini(String question) {

        String prompt = """
                You are a helpful legal information assistant for a
                college project called Legal Assistant.

                Provide clear and easy-to-understand general legal
                information.

                Do not claim to be a lawyer.
                Do not provide definitive legal advice.
                Mention that users should consult a qualified lawyer
                for advice specific to their situation.

                User question:
                """ + question;

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}
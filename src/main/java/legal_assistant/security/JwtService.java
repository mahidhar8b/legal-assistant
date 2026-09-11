package legal_assistant.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import legal_assistant.entity.Lawyer;
import legal_assistant.entity.User;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY =
            "my-super-secret-key-for-legal-assistant-2026-project";

    private final long EXPIRATION_TIME =
            1000 * 60 * 60; // 1 hour


    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }


    // USER TOKEN

    public String generateToken(User user) {

        return Jwts.builder()

                .subject(user.getEmail())

                .claim(
                        "role",
                        user.getRole().name()
                )

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(getSigningKey())

                .compact();
    }


    // LAWYER TOKEN

    public String generateLawyerToken(Lawyer lawyer) {

        return Jwts.builder()

                .subject(lawyer.getEmail())

                .claim(
                        "role",
                        "LAWYER"
                )

                .claim(
                        "lawyerId",
                        lawyer.getId()
                )

                .claim(
                        "name",
                        lawyer.getName()
                )

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(getSigningKey())

                .compact();
    }


    // EXTRACT EMAIL

    public String extractEmail(String token) {

        Claims claims = Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();

        return claims.getSubject();
    }
}
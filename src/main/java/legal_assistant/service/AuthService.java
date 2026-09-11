package legal_assistant.service;

import legal_assistant.dto.LoginRequest;
import legal_assistant.entity.User;
import legal_assistant.repository.UserRepository;
import legal_assistant.repository.LawyerRepository;
import legal_assistant.security.JwtService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            LawyerRepository lawyerRepository,
            JwtService jwtService
    ) {

        this.userRepository = userRepository;
        this.lawyerRepository = lawyerRepository;

        this.passwordEncoder =
                new BCryptPasswordEncoder();

        this.jwtService = jwtService;
    }


    // =========================
    // USER REGISTER
    // =========================

    public User register(User user) {

        if (userRepository
                .findByEmail(user.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }


    // =========================
    // USER LOGIN
    // =========================

    public String login(LoginRequest request) {

        User user =
                userRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return jwtService.generateToken(user);
    }


    // =========================
    // LAWYER LOGIN
    // =========================

    public String lawyerLogin(LoginRequest request) {

        var lawyer =
                lawyerRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        /*
         * IMPORTANT:
         *
         * Your current Lawyer entity does NOT have
         * a password field.
         *
         * Therefore we cannot verify a lawyer password
         * yet.
         */

        throw new RuntimeException(
                "Lawyer authentication is not configured yet"
        );
    }
}
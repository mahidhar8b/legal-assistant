package legal_assistant.service;

import legal_assistant.entity.Lawyer;
import legal_assistant.repository.LawyerRepository;
import legal_assistant.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LawyerAuthService {

    private final LawyerRepository lawyerRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    // =========================
    // CONSTRUCTOR
    // =========================

    public LawyerAuthService(
            LawyerRepository lawyerRepository,
            JwtService jwtService) {

        this.lawyerRepository = lawyerRepository;

        this.passwordEncoder =
                new BCryptPasswordEncoder();

        this.jwtService = jwtService;
    }


    // =========================
    // LAWYER SIGNUP
    // =========================

    public Lawyer register(Lawyer lawyer) {

        System.out.println(
                "========== LAWYER SIGNUP =========="
        );

        System.out.println(
                "Email: " + lawyer.getEmail()
        );

        // Check whether email already exists

        if (lawyerRepository
                .findByEmail(lawyer.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }


        // Encrypt password before saving

        lawyer.setPassword(
                passwordEncoder.encode(
                        lawyer.getPassword()
                )
        );


        System.out.println(
                "Password encrypted successfully"
        );


        // Save lawyer

        Lawyer savedLawyer =
                lawyerRepository.save(lawyer);


        System.out.println(
                "Lawyer registered with ID: "
                        + savedLawyer.getId()
        );


        return savedLawyer;
    }


    // =========================
    // LAWYER LOGIN
    // =========================

    public String login(
            String email,
            String password) {


        System.out.println(
                "========== LAWYER LOGIN =========="
        );


        System.out.println(
                "Email received: [" + email + "]"
        );


        System.out.println(
                "Password received: [" + password + "]"
        );


        // Find lawyer using email

        Lawyer lawyer =
                lawyerRepository
                        .findByEmail(email)
                        .orElse(null);


        // Lawyer not found

        if (lawyer == null) {

            System.out.println(
                    "RESULT: LAWYER NOT FOUND"
            );

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        System.out.println(
                "Lawyer found: "
                        + lawyer.getName()
        );


        System.out.println(
                "Lawyer ID: "
                        + lawyer.getId()
        );


        System.out.println(
                "Stored password: "
                        + lawyer.getPassword()
        );


        // Check password

        boolean passwordCorrect =
                passwordEncoder.matches(
                        password,
                        lawyer.getPassword()
                );


        System.out.println(
                "Password matches: "
                        + passwordCorrect
        );


        // Incorrect password

        if (!passwordCorrect) {

            System.out.println(
                    "RESULT: PASSWORD INCORRECT"
            );

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        // Login successful

        System.out.println(
                "RESULT: LOGIN SUCCESS"
        );


        // Generate JWT

        return jwtService.generateLawyerToken(
                lawyer
        );
    }
}
package legal_assistant.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lawyers")
public class Lawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String specialization;

    private int experience;

    private String location;

    private double consultationFee;

    private String availability;


    // Default constructor
    public Lawyer() {
    }


    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // NAME
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // EMAIL
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // PASSWORD
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    // SPECIALIZATION
    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }


    // EXPERIENCE
    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }


    // LOCATION
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    // CONSULTATION FEE
    public double getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(double consultationFee) {
        this.consultationFee = consultationFee;
    }


    // AVAILABILITY
    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}
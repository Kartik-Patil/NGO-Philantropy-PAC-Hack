package dev.karthik.NGOApplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "philanthropist_registrations")
public class PhilanthropistRegistration {

    @Id
    private String id;
    private String fullName;
    private String email; 
    private String password;
    private String country;
    private String state;
    private String city;
    private String phoneNumber;
    private String occupation;

    public PhilanthropistRegistration() {}

    public PhilanthropistRegistration(String fullName, String email, String password, String country, String state, String city, String phoneNumber, String occupation) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.country = country;
        this.state = state;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.occupation = occupation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCountry() {
        return country;
    }

    public String state() {
        return state;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }




}
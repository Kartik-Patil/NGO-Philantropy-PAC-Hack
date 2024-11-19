package dev.karthik.NGOApplication.dto;

import dev.karthik.NGOApplication.model.PhilanthropistRegistration;

public class PhilanthropistLoginResponse {
    private String status;
    private PhilanthropistRegistration philanthropist;

    // Constructors, getters, and setters
    public PhilanthropistLoginResponse(String status, PhilanthropistRegistration philanthropist) {
        this.status = status;
        this.philanthropist = philanthropist;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public PhilanthropistRegistration getPhilanthropist() {
        return philanthropist;
    }

    public void setPhilanthropist(PhilanthropistRegistration philanthropist) {
        this.philanthropist = philanthropist;
    }
}

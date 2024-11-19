package dev.karthik.NGOApplication.dto;

import dev.karthik.NGOApplication.model.NgoRegistration;

public class NgoLoginResponse {
    private String status;
    private NgoRegistration ngo;

    // Constructors, getters, and setters
    public NgoLoginResponse(String status, NgoRegistration ngo) {
        this.status = status;
        this.ngo = ngo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public NgoRegistration getNgo() {
        return ngo;
    }

    public void setNgo(NgoRegistration ngo) {
        this.ngo = ngo;
    }
}

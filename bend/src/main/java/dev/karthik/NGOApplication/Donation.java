package dev.karthik.NGOApplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "philanthropist_donations")
public class Donation {
    
    @Id
    private String id;
    private String philanthropistId;
    private String listedProjectName;
    private String amount;
    private String listedNgo;
    private LocalDateTime dateTime;
    private String name;

    public Donation() {
        this.dateTime = LocalDateTime.now();
    }

    public Donation(String philanthropistId, String listedProjectName, String listedNgo, String amount, String name) {
        this.philanthropistId = philanthropistId;
        this.listedProjectName = listedProjectName;
        this.listedNgo = listedNgo;
        this.amount = amount;
        this.dateTime = LocalDateTime.now();
        this.name = name;
    }

    // Getters and Setters

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhilanthropistId() {
        return philanthropistId;
    }

    public void setPhilanthropistId(String philanthropistId) {
        this.philanthropistId = philanthropistId;
    }

    public String getListedProjectName() {
        return listedProjectName;
    }

    public void setListedProjectName(String listedProjectName) {
        this.listedProjectName = listedProjectName;
    }

    public String getListedNgo() {
        return listedNgo;
    }

    public void setListedNgo(String listedNgo) {
        this.listedNgo = listedNgo;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

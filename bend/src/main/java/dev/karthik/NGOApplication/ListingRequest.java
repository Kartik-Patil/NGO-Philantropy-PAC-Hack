package dev.karthik.NGOApplication.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="ngo_listings")
public class ListingRequest {
    
    @Id
    private String id;
    private String ngoName;
    private String title;
    private String description;
    private String category;
    private String imgUrl;
    private String targetAmount;
    private String duration;
    private String beneficiaryInfo;

    public ListingRequest() {

    }

    public ListingRequest(String ngoName, String title, String description, String category, String imgUrl, String targetAmount, String duration, String beneficiaryInfo) {
        this.ngoName = ngoName;
        this.title = title;
        this.description = description;
        this.category = category;
        this.imgUrl = imgUrl;
        this.targetAmount = targetAmount;
        this.duration = duration;
        this.beneficiaryInfo = beneficiaryInfo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(String targetAmount) {
        this.targetAmount = targetAmount;
    }

    public String getDuration( ) {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getBeneficiaryInfo() {
        return beneficiaryInfo;
    }

    public void setBeneficiaryInfo(String beneficiaryInfo) {
        this.beneficiaryInfo = beneficiaryInfo;
    }
}
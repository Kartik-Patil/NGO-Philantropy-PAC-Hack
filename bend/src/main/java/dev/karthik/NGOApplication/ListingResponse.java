package dev.karthik.NGOApplication.dto;

import dev.karthik.NGOApplication.model.ListingRequest;

public class ListingResponse {
    private String message;
    private ListingRequest listing;

    public ListingResponse(String message, ListingRequest listing) {
        this.message = message;
        this.listing = listing;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ListingRequest getListing() {
        return listing;
    }

    public void setListing(ListingRequest listing) {
        this.listing = listing;
    }

}
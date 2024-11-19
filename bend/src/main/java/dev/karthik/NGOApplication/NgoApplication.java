package dev.karthik.NGOApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import dev.karthik.NGOApplication.model.NgoRegistration;
import dev.karthik.NGOApplication.repository.NgoRegistrationRepository;
import dev.karthik.NGOApplication.model.PhilanthropistRegistration;
import dev.karthik.NGOApplication.repository.PhilanthropistRegistrationRepository;
import dev.karthik.NGOApplication.dto.NgoLoginRequest;
import dev.karthik.NGOApplication.dto.NgoLoginResponse;
import dev.karthik.NGOApplication.dto.PhilanthropistLoginRequest;
import dev.karthik.NGOApplication.dto.PhilanthropistLoginResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import dev.karthik.NGOApplication.repository.ListingRequestRepository;
import dev.karthik.NGOApplication.dto.ListingResponse;
import dev.karthik.NGOApplication.model.ListingRequest;
import java.util.List;
import java.util.Optional;
import dev.karthik.NGOApplication.model.Donation;
import dev.karthik.NGOApplication.repository.DonationRepository;
import java.time.LocalDateTime;


import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;

@SpringBootApplication
@RestController
public class NgoApplication {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private Service service;

    @Autowired
    private ListingRequestRepository listingRequestRepository;

    @Autowired
    private NgoRegistrationRepository ngoRegistrationRepository;

    @Autowired
    private PhilanthropistRegistrationRepository philanthropistRegistrationRepository;

    public static void main(String[] args) {
        SpringApplication.run(NgoApplication.class, args);
    }

    @GetMapping("/")
    public String apiRoot() {
        return "Hello world. Thank God it is working";
    }

    @PostMapping("/registration/ngo")
    public NgoRegistration registerNgo(@RequestBody NgoRegistration ngoRegistration) {
        ngoRegistrationRepository.save(ngoRegistration);
        return ngoRegistration;
    }

    @PostMapping("/registration/philanthropist")
    public PhilanthropistRegistration registerPhilanthropist(@RequestBody PhilanthropistRegistration philanthropistRegistration) {
        philanthropistRegistrationRepository.save(philanthropistRegistration);
        return philanthropistRegistration;
    }

    @PostMapping("/login/ngo")
    public NgoLoginResponse loginNgo(@RequestBody NgoLoginRequest ngoLoginRequest) {
        Optional<NgoRegistration> ngoOptional = ngoRegistrationRepository.findByEmail(ngoLoginRequest.getEmail());

        if (ngoOptional.isPresent()) {
            NgoRegistration ngo = ngoOptional.get();
            if (ngo.getPassword().equals(ngoLoginRequest.getPassword())) {
                return new NgoLoginResponse("success", ngo);
            } else {
                return new NgoLoginResponse("password incorrect", null);
            }
        } else {
            return new NgoLoginResponse("user not found", null);
        }
    }


    @PostMapping("/login/philanthropist")
    public PhilanthropistLoginResponse loginPhilanthropist(@RequestBody PhilanthropistLoginRequest philanthropistLoginRequest) {
        Optional<PhilanthropistRegistration> philanthropistOptional = philanthropistRegistrationRepository.findByEmail(philanthropistLoginRequest.getEmail());

        if (philanthropistOptional.isPresent()) {
            PhilanthropistRegistration philanthropist = philanthropistOptional.get();
            if (philanthropist.getPassword().equals(philanthropistLoginRequest.getPassword())) {
                return new PhilanthropistLoginResponse("success", philanthropist);
            } else {
                return new PhilanthropistLoginResponse("password incorrect", null);
            }
        } else {
            return new PhilanthropistLoginResponse("user not found", null);
        }
    }

    @GetMapping("/get/ngo")
    public List<NgoRegistration> getAllNgoRegistrations() {
        return ngoRegistrationRepository.findAll();
    }

    @PostMapping("/uploadToGoogleDrive")
    public Object handleFileUpload(@RequestParam("image") MultipartFile file) throws IOException, GeneralSecurityException {
        if (file.isEmpty()) {
            return "FIle is empty";
        }
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        Res res = service.uploadImageToDrive(tempFile);
        System.out.println(res);
        return res;
    }

    @PostMapping("/listing")
    public ListingResponse listingResponse(@RequestBody ListingRequest listing ) {
        listingRequestRepository.save(listing);
        return new ListingResponse("Successfully Listed", listing);
    }

    @PostMapping("/profile-update")
    public NgoRegistration updateProfile(@RequestBody NgoRegistration updatedNgo) {
        Optional<NgoRegistration> existingNgo = ngoRegistrationRepository.findById(updatedNgo.getId());

        if (existingNgo.isPresent()) {
            NgoRegistration ngo = existingNgo.get();
            ngo.setName(updatedNgo.getName());
            ngo.setContactPersonName(updatedNgo.getContactPersonName());
            ngo.setEmail(updatedNgo.getEmail());
            // Update other fields as necessary
            ngoRegistrationRepository.save(ngo);
            return ngo;
        } else {
            throw new RuntimeException("NGO not found with id " + updatedNgo.getId());
        }
    }

    
    @PostMapping("/ngo-listings")
    public List<ListingRequest> getListingsByNgoName(@RequestParam String name) {
        return listingRequestRepository.findByNgoName(name);
    }

    @PostMapping("/getListingById")
    public Optional<ListingRequest> getListById(@RequestParam String id) {
        return listingRequestRepository.findById(id);
    }

    @PostMapping("/getNgoByName")
    public Optional<NgoRegistration> getNgoByName(@RequestParam String name) {
        return ngoRegistrationRepository.findByName(name);
    }

    @PostMapping("/getNgoById")
    public Optional<NgoRegistration> getNgoById(@RequestParam String id) {
        return ngoRegistrationRepository.findById(id);
    }

    @PostMapping("/deleteListing/{id}")
    public String deleteListingById(@PathVariable String id) {
        try {
            listingRequestRepository.deleteById(id);
            return "Successfully Deleted Listing";
        } catch (Exception e) {
            return "There was an error deleting the listing";
        }
        
    }

    @PostMapping("/submit-donation")    
    public Donation createDonation(
    @RequestParam("philanthropistId") String philanthropistId,
    @RequestParam("listedProjectName") String listedProjectName,
    @RequestParam("listedNgo") String listedNgo,
    @RequestParam("amount") String amount,
    @RequestParam("name") String name
) {
    Donation donation = new Donation();
    donation.setPhilanthropistId(philanthropistId);
    donation.setListedProjectName(listedProjectName);
    donation.setListedNgo(listedNgo);
    donation.setAmount(amount);
    donation.setName(name);
    donation.setDateTime(LocalDateTime.now()); // Set the current date and time
    Donation savedDonation = donationRepository.save(donation);
    return savedDonation;
}

    @PostMapping("/getDonations")
    public List<Donation> getDonations(@RequestParam String philanthropistId) {
        return donationRepository.findByPhilanthropistId(philanthropistId);
    }

    @PostMapping("/getNgoDonations")
    public List<Donation> getNgoDonationsByName(@RequestParam String name) {
        return donationRepository.findByListedNgo(name);
    }
}

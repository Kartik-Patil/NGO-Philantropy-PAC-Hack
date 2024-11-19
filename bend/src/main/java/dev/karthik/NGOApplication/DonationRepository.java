package dev.karthik.NGOApplication.repository;

import dev.karthik.NGOApplication.model.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    List<Donation> findByPhilanthropistId(String philanthropistId);
    List<Donation> findByListedNgo(String listedNgo);

    // Add other query methods as needed
}

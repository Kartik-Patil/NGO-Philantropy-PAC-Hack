package dev.karthik.NGOApplication.repository;
import java.util.List;
import dev.karthik.NGOApplication.model.ListingRequest;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.karthik.NGOApplication.model.ListingRequest;

public interface ListingRequestRepository extends MongoRepository<ListingRequest, String> {
    // Add custom query methods if needed
    List<ListingRequest> findByNgoName(String name);
}

package dev.karthik.NGOApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.karthik.NGOApplication.model.NgoRegistration;
import java.util.Optional;

public interface NgoRegistrationRepository extends MongoRepository<NgoRegistration, String> {
    Optional<NgoRegistration> findByEmail(String email);
    Optional<NgoRegistration> findByName(String name);
}

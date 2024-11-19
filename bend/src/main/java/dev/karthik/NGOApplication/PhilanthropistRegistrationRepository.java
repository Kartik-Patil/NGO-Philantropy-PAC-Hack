package dev.karthik.NGOApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.karthik.NGOApplication.model.PhilanthropistRegistration;
import java.util.Optional;

public interface PhilanthropistRegistrationRepository extends MongoRepository<PhilanthropistRegistration, String> {
    Optional<PhilanthropistRegistration> findByEmail(String email);
}
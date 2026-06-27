package Tharshihan.backend.repo;

import Tharshihan.backend.enums.DocumentStatus;
import Tharshihan.backend.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepo extends JpaRepository<Document, Long> {

    List<Document> findByUploadedById(Long userId);
    List<Document> findByAssignedManagerId(Long managerId);

}
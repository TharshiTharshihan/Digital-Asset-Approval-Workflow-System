package Tharshihan.backend.service;

import Tharshihan.backend.enums.DocumentStatus;
import Tharshihan.backend.model.Document;
import Tharshihan.backend.model.User;
import Tharshihan.backend.repo.DocumentRepo;
import Tharshihan.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.io.IOException;

@Service
public class DocumentService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DocumentRepo documentRepo;

    public Document uploadDocument(
            Long userId,
            String title,
            MultipartFile file
            ) throws IOException {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Document document = new Document();

        document.setTitle(title);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileData(file.getBytes());
        document.setUploadedBy(user);
        document.setUploadedDate(new Date());

        document.setStatus(DocumentStatus.PENDING);

        return documentRepo.save(document);
    }

    public List<Document> getAllDocuments() {
    List<Document> documents = documentRepo.findAll();
    return documents;
    }

    public List<Document> myDocuments(Long userId) {
        return documentRepo.findByUploadedById(userId);
    }

    public Document getSingleDocument(Long id) {
        return documentRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("Document is not found for this id: "+ id));
    }

    public Document updateDocument(Long id, String status, Long managerId) {
        Document doc = documentRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Document not found"+id));
        User manager = userRepo.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found" +managerId));


        doc.setStatus(DocumentStatus.valueOf(status.toUpperCase()));
        doc.setAssignedManager(manager);

        return documentRepo.save(doc);

    }

    public List<Document> assignedDocuments(Long managerId) {
        return documentRepo.findByAssignedManagerId(managerId);

    }
}
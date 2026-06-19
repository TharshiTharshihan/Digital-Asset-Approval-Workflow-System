package Tharshihan.backend.service;

import Tharshihan.backend.enums.DocumentStatus;
import Tharshihan.backend.model.Document;
import Tharshihan.backend.repo.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepo;

    public Document uploadDocument(
            String title,
            MultipartFile file,
            String uploadedBy) throws IOException {

        Document document = new Document();

        document.setTitle(title);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileData(file.getBytes());

        document.setUploadedBy(uploadedBy);
        document.setUploadedDate(new Date());

        document.setStatus(DocumentStatus.PENDING);

        return documentRepo.save(document);
    }
}
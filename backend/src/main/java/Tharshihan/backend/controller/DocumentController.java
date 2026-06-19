package Tharshihan.backend.controller;

import Tharshihan.backend.model.Document;
import Tharshihan.backend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/document")
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam String title,
            @RequestParam MultipartFile file,
            @RequestParam String uploadedBy)
            throws IOException {

        return ResponseEntity.ok(
                documentService.uploadDocument(
                        title,
                        file,
                        uploadedBy));
    }
}

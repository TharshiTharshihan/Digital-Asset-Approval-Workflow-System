package Tharshihan.backend.controller;

import Tharshihan.backend.model.Document;
import Tharshihan.backend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/document")
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam MultipartFile file
            )
            throws IOException {

        return ResponseEntity.ok(
                documentService.uploadDocument(
                        userId,
                        title,
                        file));
    }

    //get all document (Admin)
    @GetMapping("/all")
    public ResponseEntity<List<Document>>getAllDocuments(){
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // get loggedIn user files only
    @GetMapping("/my-files/{userId}")
    public ResponseEntity<List<Document>>myDocuments(@PathVariable Long userId ){
        List<Document> documents = documentService.myDocuments(userId);
        return ResponseEntity.ok(documents);
    }


    // view single file
    @GetMapping("/file/{id}")
    public ResponseEntity<Document>getSingleDocument(@PathVariable Long id){
        Document document = documentService.getSingleDocument(id);

        if(document != null){
            return new ResponseEntity<>(document, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}

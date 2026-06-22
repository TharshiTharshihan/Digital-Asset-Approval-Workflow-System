package Tharshihan.backend.model;

import Tharshihan.backend.enums.DocumentStatus;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] fileData;
    @Enumerated(EnumType.STRING)
    private DocumentStatus status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uploadedBy;
    private Date uploadedDate;

    public Document() {
    }
    public Document(Long id, String title, String fileName,
                    String fileType, byte[] fileData,
                    DocumentStatus status,
                    User uploadedBy,
                    Date uploadedDate) {
        this.id = id;
        this.title = title;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileData = fileData;
        this.status = status;
        this.uploadedBy = uploadedBy;
        this.uploadedDate = uploadedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public Date getUploadedDate() {
        return uploadedDate;
    }

    public void setUploadedDate(Date uploadedDate) {
        this.uploadedDate = uploadedDate;
    }
}

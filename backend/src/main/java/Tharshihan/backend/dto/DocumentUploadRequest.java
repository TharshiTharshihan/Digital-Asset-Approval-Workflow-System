package Tharshihan.backend.dto;

public class DocumentUploadRequest {

    private String title;

    public DocumentUploadRequest(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

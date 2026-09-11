package legal_assistant.dto;

public class LegalCasePredictionRequest {

    private String caseType;
    private String legalCategory;
    private String court;
    private int year;
    private int caseDurationMonths;
    private String previousStatus;

    public String getCaseType() {
        return caseType;
    }

    public void setCaseType(String caseType) {
        this.caseType = caseType;
    }

    public String getLegalCategory() {
        return legalCategory;
    }

    public void setLegalCategory(String legalCategory) {
        this.legalCategory = legalCategory;
    }

    public String getCourt() {
        return court;
    }

    public void setCourt(String court) {
        this.court = court;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getCaseDurationMonths() {
        return caseDurationMonths;
    }

    public void setCaseDurationMonths(int caseDurationMonths) {
        this.caseDurationMonths = caseDurationMonths;
    }

    public String getPreviousStatus() {
        return previousStatus;
    }

    public void setPreviousStatus(String previousStatus) {
        this.previousStatus = previousStatus;
    }
}
package victor.java.api.model;

import java.util.Date;

public class ServiceRequest {
    private int id;
    private int statusId;
    private String statusName;
    private String issueDescription;
    private Date requestDate;
    private String clientName;
    private Device device;

    public ServiceRequest(int id, int statusId, String statusName, String issueDescription, Date requestDate, String clientName, Device device) {
        this.id = id;
        this.statusId = statusId;
        this.statusName = statusName;
        this.issueDescription = issueDescription;
        this.requestDate = requestDate;
        this.clientName = clientName;
        this.device = device;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }
}

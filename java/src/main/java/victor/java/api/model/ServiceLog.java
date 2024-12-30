package victor.java.api.model;

import java.util.Date;

public class ServiceLog {
    private int id;
    private String deviceName;
    private String clientUsername;
    private Date serviceDate;
    private String notes;
    private String serviceTypeName;

    public ServiceLog() {
    }

    public ServiceLog(int id, String deviceName, String clientUsername, Date serviceDate, String notes, String serviceTypeName) {
        this.id = id;
        this.deviceName = deviceName;
        this.clientUsername = clientUsername;
        this.serviceDate = serviceDate;
        this.notes = notes;
        this.serviceTypeName = serviceTypeName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getClientUsername() {
        return clientUsername;
    }

    public void setClientUsername(String clientUsername) {
        this.clientUsername = clientUsername;
    }

    public Date getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(Date serviceDate) {
        this.serviceDate = serviceDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getServiceTypeName() {
        return serviceTypeName;
    }

    public void setServiceTypeName(String serviceTypeName) {
        this.serviceTypeName = serviceTypeName;
    }
}

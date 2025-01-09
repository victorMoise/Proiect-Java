package victor.java.api.model;

public class LastTechnicianServiceLogDate {
    private String username;
    private String lastServiceDate;
    private String serviceType;

    public LastTechnicianServiceLogDate(String username, String lastServiceDate, String serviceType) {
        this.username = username;
        this.lastServiceDate = lastServiceDate;
        this.serviceType = serviceType;
    }

    public String getUsername() {
        return username;
    }

    public String getLastServiceDate() {
        return lastServiceDate;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setLastServiceDate(String lastServiceDate) {
        this.lastServiceDate = lastServiceDate;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }
}

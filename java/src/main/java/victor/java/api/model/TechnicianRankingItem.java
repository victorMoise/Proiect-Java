package victor.java.api.model;

public class TechnicianRankingItem {
    private int place;
    private String username;
    private int servicesCount;
    private double averageServiceCount;

    public TechnicianRankingItem(int place, String username, int servicesCount, double averageServiceCount) {
        this.place = place;
        this.username = username;
        this.servicesCount = servicesCount;
        this.averageServiceCount = averageServiceCount;
    }

    public int getPlace() {
        return place;
    }

    public String getUsername() {
        return username;
    }

    public int getServicesCount() {
        return servicesCount;
    }

    public double getAverageServiceCount() {
        return averageServiceCount;
    }

    public void setPlace(int place) {
        this.place = place;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setServicesCount(int servicesCount) {
        this.servicesCount = servicesCount;
    }

    public void setAverageServiceCount(double averageServiceCount) {
        this.averageServiceCount = averageServiceCount;
    }
}

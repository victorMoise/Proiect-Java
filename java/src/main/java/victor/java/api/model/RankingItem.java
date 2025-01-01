package victor.java.api.model;

public class RankingItem {
    private int place;
    private String username;
    private int count;
    private double averageCount;

    public RankingItem(int place, String username, int count, double averageCount) {
        this.place = place;
        this.username = username;
        this.count = count;
        this.averageCount = averageCount;
    }

    public int getPlace() {
        return place;
    }

    public String getUsername() {
        return username;
    }

    public int getCount() {
        return count;
    }

    public double getAverageCount() {
        return averageCount;
    }

    public void setPlace(int place) {
        this.place = place;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCount(int servicesCount) {
        this.count = servicesCount;
    }

    public void setAverageCount(double averageServiceCount) {
        this.averageCount = averageServiceCount;
    }
}

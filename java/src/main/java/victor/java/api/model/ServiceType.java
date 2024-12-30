package victor.java.api.model;

public class ServiceType {
    private int id;
    private String name;
    private String code;
    private double price;

    public ServiceType() {
    }

    public ServiceType(int id, String name, String code, double price) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }
}

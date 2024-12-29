package victor.java.api.request;

public record DeviceAddRequest(
        String brand,
        String model,
        String deviceType,
        String serialNumber,
        String clientName
) { }

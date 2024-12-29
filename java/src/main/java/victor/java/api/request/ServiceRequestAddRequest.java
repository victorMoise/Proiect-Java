package victor.java.api.request;

public record ServiceRequestAddRequest(
        int deviceId,
        String issueDescription
) { }

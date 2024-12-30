package victor.java.api.request;

public record ServiceLogAddRequest(
        int serviceRequestId,
        int serviceTypeId,
        String notes,
        String username
) { }

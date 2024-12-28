package victor.java.api.request;

public record UserUpdateRequest(
        String username,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String address
) { }

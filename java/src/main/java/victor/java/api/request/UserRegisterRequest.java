package victor.java.api.request;

public record UserRegisterRequest(
        String username,
        String email,
        String password,
        String confirmPassword
) { }

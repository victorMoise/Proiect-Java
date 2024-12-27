package victor.java.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.ResponseMessage;
import victor.java.api.model.User;
import victor.java.api.request.UserRegisterRequest;
import victor.java.repository.User.IUserRepository;
import victor.java.util.EmailValidator;
import victor.java.util.JwtUtil;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.getUsers();
    }

    public ResponseEntity<?> login(Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        if (username == null || username.isEmpty())
            return ResponseEntity.badRequest().body("BackendErrors.EmptyUsername");

        if (password == null || password.isEmpty())
            return ResponseEntity.badRequest().body("BackendErrors.EmptyPassword");

        User user = userRepository.getUser(username);

        if (user == null || !BCrypt.checkpw(password, user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "BackendErrors.InvalidCredentials"));

        String token = JwtUtil.generateToken(username);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    public ResponseEntity<?> register(UserRegisterRequest request) {
        String username = request.getUsername();
        String email = request.getEmail();
        String password = request.getPassword();
        String confirmPassword = request.getConfirmPassword();

        if (username == null || username.isEmpty())
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.EmptyUsername"));

        if (email == null || email.isEmpty())
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.EmptyEmail"));

        if (!EmailValidator.isValid(email))
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.InvalidEmail"));

        if (password == null || password.isEmpty())
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.EmptyPassword"));

        if (confirmPassword == null || confirmPassword.isEmpty())
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.EmptyConfirmPassword"));

        if (!password.equals(confirmPassword))
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.PasswordsDoNotMatch"));

        final int minimumPasswordLength = 8;
        if (password.length() < minimumPasswordLength)
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.PasswordTooShort"));

        if (userRepository.getUser(username) != null)
            return ResponseEntity.badRequest().body(new ResponseMessage("BackendErrors.UsernameAlreadyExists"));

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        boolean insertResult = userRepository.addUser(username, email, hashedPassword);

        if (!insertResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "BackendErrors.ErrorRegistering"));

        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully"));
    }
}
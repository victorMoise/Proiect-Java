package victor.java.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.User;
import victor.java.repository.User.IUserRepository;
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
}
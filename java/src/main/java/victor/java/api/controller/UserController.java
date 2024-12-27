package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.model.User;
import victor.java.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/list")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        return userService.login(loginRequest);
    }
}

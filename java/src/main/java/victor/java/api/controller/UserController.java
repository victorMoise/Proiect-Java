package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.request.UserRegisterRequest;
import victor.java.service.UserService;

import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping("user/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {
        return userService.register(request);
    }
}

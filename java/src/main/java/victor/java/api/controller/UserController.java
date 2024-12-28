package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.request.UserRegisterRequest;
import victor.java.api.request.UserUpdateRequest;
import victor.java.service.UserService;

import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/info")
    public ResponseEntity<?> getUserInfo(@RequestParam String username) {
        return userService.getUserInfo(username);
    }

    @GetMapping("/user/role")
    public ResponseEntity<?> getRole(@RequestParam String username) {
        return userService.getRole(username);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return userService.login(request);
    }

    @PostMapping("user/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {
        return userService.register(request);
    }

    @PutMapping("user/info")
    public ResponseEntity<?> updateUserInfo(@RequestParam String username, @RequestBody UserUpdateRequest request) {
        return userService.updateUserInfo(username, request);
    }
}

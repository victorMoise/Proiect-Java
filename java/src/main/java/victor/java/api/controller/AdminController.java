package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import victor.java.service.UserService;

@RestController
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/user/list")
    public ResponseEntity<?> getUserList(@RequestParam String username) {
        return userService.getUserList();
    }

    @GetMapping("/admin/user/role")
    public ResponseEntity<?> getRoleList() {
        return userService.getRoleList();
    }

    @PutMapping("/admin/user/role")
    public ResponseEntity<?> updateRole(@RequestParam String username, @RequestParam int role) {
        return userService.updateRole(username, role);
    }
}

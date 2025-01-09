package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import victor.java.service.StatisticsService;
import victor.java.service.UserService;

@RestController
public class AdminController {
    private final UserService userService;
    private final StatisticsService statisticsService;

    public AdminController(UserService userService, StatisticsService statisticsService) {
        this.userService = userService;
        this.statisticsService = statisticsService;
    }

    @GetMapping("/admin/user/list")
    public ResponseEntity<?> getUserList(@RequestParam String username) {
        return userService.getUserList();
    }

    @GetMapping("/admin/statistics/above-average-technicians")
    public ResponseEntity<?> getAboveAverageTechnicians() {
        return statisticsService.getAboveAverageTechnicians();
    }

    @GetMapping("admin/statistics/above-average-clients")
    public ResponseEntity<?> getAboveAverageClients() {
        return statisticsService.getAboveAverageClients();
    }

    @GetMapping("admin/statistics/total-paid-by-users")
    public ResponseEntity<?> getTotalPaidByUsers() {
        return statisticsService.getTotalPaidByUsers();
    }

    @GetMapping("admin/statistics/last-technician-service-log")
    public ResponseEntity<?> getLastTechnicianLog() {
        return statisticsService.getLastTechnicianLog();
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

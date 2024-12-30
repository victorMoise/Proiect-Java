package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.request.ServiceLogAddRequest;
import victor.java.service.ServiceLogService;

@RestController
public class ServiceLogController {
    private final ServiceLogService serviceLogService;

    public ServiceLogController(ServiceLogService serviceLogService) {
        this.serviceLogService = serviceLogService;
    }

    @GetMapping("/service-log/types")
    public ResponseEntity<?> getServiceTypes() {
        return serviceLogService.getServiceTypes();
    }

    @GetMapping("/service-log/list")
    public ResponseEntity<?> getServiceLogList(@RequestParam String username) {
        return serviceLogService.getServiceLogList(username);
    }

    @PostMapping("/service-log")
    public ResponseEntity<?> addServiceLog(@RequestBody ServiceLogAddRequest request) {
        return serviceLogService.addServiceLog(request);
    }

    @DeleteMapping("/service-log/{serviceLogId}")
    public ResponseEntity<?> deleteServiceLog(@PathVariable int serviceLogId) {
        return serviceLogService.deleteServiceLog(serviceLogId);
    }
}

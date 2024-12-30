package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/service-log")
    public ResponseEntity<?> addServiceLog(@RequestBody ServiceLogAddRequest request) {
        return serviceLogService.addServiceLog(request);
    }
}

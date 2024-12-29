package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/service-request")
public class ServiceRequestController {
    @GetMapping()
    public ResponseEntity<?> getServiceRequestList(@RequestParam String username) {
        return serviceRequestService.getServiceRequestList(username);
    }
}

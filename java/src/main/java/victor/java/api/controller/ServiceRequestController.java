package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.request.ServiceRequestAddRequest;
import victor.java.service.ServiceRequestService;

@RestController()
public class ServiceRequestController {
    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @GetMapping("/service-request/list")
    public ResponseEntity<?> getServiceRequestList(@RequestParam String username) {
        return serviceRequestService.getServiceRequestList(username);
    }

    @PostMapping("/service-request")
    public ResponseEntity<?> addServiceRequest(@RequestBody ServiceRequestAddRequest request) {
        return serviceRequestService.addServiceRequest(request);
    }

    @PutMapping("/service-request/status")
    public ResponseEntity<?> updateServiceRequestStatus(@RequestParam int serviceRequestId, @RequestParam int statusId) {
        return serviceRequestService.updateServiceRequestStatus(serviceRequestId, statusId);
    }

    @DeleteMapping("/service-request/{serviceRequestId}")
    public ResponseEntity<?> deleteServiceRequest(@PathVariable int serviceRequestId) {
        return serviceRequestService.deleteServiceRequest(serviceRequestId);
    }
}

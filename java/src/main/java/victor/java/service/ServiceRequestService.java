package victor.java.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.Device;
import victor.java.api.model.ServiceLog;
import victor.java.api.model.ServiceRequest;
import victor.java.api.model.User;
import victor.java.api.request.ServiceRequestAddRequest;
import victor.java.repository.Device.IDeviceRepository;
import victor.java.repository.ServiceLog.ServiceLogRepository;
import victor.java.repository.ServiceRequest.IServiceRequestRepository;
import victor.java.repository.User.IUserRepository;

import java.util.Collections;
import java.util.List;

@Service
public class ServiceRequestService {
    private final IServiceRequestRepository serviceRequestRepository;
    private final IUserRepository userRepository;
    private final IDeviceRepository deviceRepository;
    private final ServiceLogRepository serviceLogRepository;

    public ServiceRequestService(IServiceRequestRepository serviceRequestRepository, IUserRepository userRepository, IDeviceRepository deviceRepository, ServiceLogRepository serviceLogRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
        this.serviceLogRepository = serviceLogRepository;
    }

    public ResponseEntity<?> getServiceRequestList(String username) {
        if (!String.valueOf(username).isBlank()) {
            User user = userRepository.getUser(username);

            if (user == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "User not found"));
        }

        List<ServiceRequest> serviceRequests = serviceRequestRepository.getServiceRequestList(username);
        return ResponseEntity.ok(serviceRequests);
    }

    public ResponseEntity<?> addServiceRequest(ServiceRequestAddRequest request) {
        Device device = deviceRepository.getDevice(request.deviceId());

        if (device == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Device not found"));

        ServiceRequest insertResult = serviceRequestRepository.addServiceRequest(request);
        return ResponseEntity.ok(insertResult);
    }

    public ResponseEntity<?> deleteServiceRequest(int serviceRequestId) {
        List<ServiceLog> serviceLogs = serviceLogRepository.getServiceLogList(serviceRequestId);

        if (!serviceLogs.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "BackendErrors.ServiceLogsFound"));

        boolean deleteResult = serviceRequestRepository.deleteServiceRequest(serviceRequestId);

        if (!deleteResult)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Service request not found"));

        return ResponseEntity.ok("Service request with id " +  serviceRequestId + " deleted successfully");
    }

    public ResponseEntity<?> updateServiceRequestStatus(int serviceRequestId, int statusId) {
        boolean updateResult = serviceRequestRepository.updateServiceRequestStatus(serviceRequestId, statusId);

        if (!updateResult)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Service request not found"));

        return ResponseEntity.ok("Service request with id " +  serviceRequestId + " updated successfully");
    }
}

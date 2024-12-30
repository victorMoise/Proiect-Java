package victor.java.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.ResponseMessage;
import victor.java.api.model.User;
import victor.java.api.request.ServiceLogAddRequest;
import victor.java.repository.ServiceLog.IServiceLogRepository;
import victor.java.repository.User.IUserRepository;

@Service
public class ServiceLogService {
    private final IServiceLogRepository serviceLogRepository;
    private final IUserRepository userRepository;

    public ServiceLogService(IServiceLogRepository serviceLogRepository, IUserRepository userRepository) {
        this.serviceLogRepository = serviceLogRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> getServiceTypes() {
        return ResponseEntity.ok(serviceLogRepository.getServiceTypeList());
    }

    public ResponseEntity<?> addServiceLog(ServiceLogAddRequest request) {
        if (request.serviceTypeId() == -1) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("BackendErrors.NoServiceTypeSelected"));
        }

        User user = userRepository.getUser(request.username());

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("BackendErrors.UserNotFound"));
        }

        boolean insertResult = serviceLogRepository.addServiceLog(user.getId(), request);

        if (!insertResult) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("BackendErrors.ServiceLogAddFailed"));
        }

        return ResponseEntity.ok("Service log added successfully");
    }
}

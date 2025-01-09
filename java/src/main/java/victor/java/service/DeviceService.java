package victor.java.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.Device;
import victor.java.api.model.ResponseMessage;
import victor.java.api.model.User;
import victor.java.api.request.DeviceAddRequest;
import victor.java.repository.Device.IDeviceRepository;
import victor.java.repository.ServiceRequest.IServiceRequestRepository;
import victor.java.repository.User.IUserRepository;

import java.util.Collections;
import java.util.List;


@Service
public class DeviceService {
    private final IUserRepository userRepository;
    private final IDeviceRepository deviceRepository;
    private final IServiceRequestRepository serviceRequestRepository;

    public DeviceService(IUserRepository userRepository, IDeviceRepository deviceRepository, IServiceRequestRepository serviceRequestRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public ResponseEntity<?> getDeviceList(String username) {
        User user = userRepository.getUser(username);

        if (user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "User not found"));

        List<Device> devices = deviceRepository.getDevices(username);
        return ResponseEntity.ok(devices);
    }

    public ResponseEntity<?> addDevice(DeviceAddRequest request) {
        User user = userRepository.getUser(request.clientName());

        if (request.model() == null || request.brand() == null || request.deviceType() == null || request.serialNumber() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "All fields are required"));

        if (user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "User not found"));

        boolean insertResult = deviceRepository.addDevice(request, user.getId());

        if (!insertResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to add device"));

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> deleteDevice(int deviceId) {
        Device device = deviceRepository.getDevice(deviceId);

        if (device == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Device not found"));

        if (serviceRequestRepository.deviceHasServiceRequest(deviceId))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "BackendErrors.DeviceHasServiceRequest"));

        boolean deleteResult = deviceRepository.deleteDevice(deviceId);

        if (!deleteResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to delete device"));

        return ResponseEntity.ok(new ResponseMessage("Device with id " + deviceId + " deleted"));
    }

    public ResponseEntity<?> updateDevice(Device request) {
        Device device = deviceRepository.getDevice(request.getId());

        if (device == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Device not found"));

        boolean updateResult = deviceRepository.updateDevice(request);

        if (!updateResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to update device"));

        return ResponseEntity.ok(new ResponseMessage("Device with id " + request.getId() + " updated"));
    }
}

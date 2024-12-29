package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.api.model.Device;
import victor.java.api.request.DeviceAddRequest;
import victor.java.service.DeviceService;

@RestController
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/device/list")
    public ResponseEntity<?> getDeviceList(@RequestParam String username) {
        return deviceService.getDeviceList(username);
    }

    @PostMapping("/device")
    public ResponseEntity<?> addDevice(@RequestBody DeviceAddRequest request) {
        return deviceService.addDevice(request);
    }

    @PutMapping("/device")
    public ResponseEntity<?> updateDevice(@RequestBody Device request) {
        return deviceService.updateDevice(request);
    }

    @DeleteMapping("/device/{deviceId}")
    public ResponseEntity<?> deleteDevice(@PathVariable int deviceId) {
        return deviceService.deleteDevice(deviceId);
    }
}

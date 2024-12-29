package victor.java.repository.Device;

import victor.java.api.model.Device;
import victor.java.api.request.DeviceAddRequest;

import java.util.List;

public interface IDeviceRepository {
    Device getDevice(int deviceId);
    List<Device> getDevices(String username);
    boolean addDevice(DeviceAddRequest device, int userId);
    boolean deleteDevice(int deviceId);
    boolean updateDevice(Device device);
}

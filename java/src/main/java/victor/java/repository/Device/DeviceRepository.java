package victor.java.repository.Device;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import victor.java.api.model.Device;
import victor.java.api.model.User;
import victor.java.api.request.DeviceAddRequest;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class DeviceRepository implements IDeviceRepository {
    private final DatabaseManager databaseManager;

    public DeviceRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @Override
    public List<Device> getDevices(String username) {
        List<Device> devices = new ArrayList<>();
        String query = "SELECT d.DeviceId, d.Brand, d.Model, d.DeviceType, d.SerialNumber, u.Username FROM Devices d INNER JOIN Users u ON d.ClientID = u.Id WHERE u.Username = ?";

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setString(1, username);

            var resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int deviceId = resultSet.getInt("DeviceId");
                String brand = resultSet.getString("Brand");
                String model = resultSet.getString("Model");
                String deviceType = resultSet.getString("DeviceType");
                String serialNumber = resultSet.getString("SerialNumber");
                String user = resultSet.getString("Username");

                devices.add(new Device(deviceId, brand, model, deviceType, serialNumber, user));
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get user role", ex);
        }

        return devices;
    }

    public boolean addDevice(DeviceAddRequest request, int userId) {
        String query = "INSERT INTO Devices (Brand, Model, DeviceType, SerialNumber, ClientID) VALUES (?, ?, ?, ?, ?)";
        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setString(1, request.brand());
            statement.setString(2, request.model());
            statement.setString(3, request.deviceType());
            statement.setString(4, request.serialNumber());
            statement.setInt(5, userId);

            statement.executeUpdate();
            return true;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add device", ex);
        }
    }

    public boolean deleteDevice(int deviceId) {
        String query = "DELETE FROM Devices WHERE DeviceId = ?";
        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setInt(1, deviceId);

            statement.executeUpdate();
            return true;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete device", ex);
        }
    }
}

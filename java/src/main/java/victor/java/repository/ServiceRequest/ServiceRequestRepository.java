package victor.java.repository.ServiceRequest;

import org.springframework.stereotype.Repository;
import victor.java.api.model.Device;
import victor.java.api.model.ServiceRequest;
import victor.java.api.request.ServiceRequestAddRequest;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ServiceRequestRepository implements IServiceRequestRepository {
    private final DatabaseManager databaseManager;

    public ServiceRequestRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    public boolean deviceHasServiceRequest(int deviceId) {
        String query = "SELECT COUNT(*) FROM ServiceRequests WHERE DeviceId = ?";

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setInt(1, deviceId);

            var resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt(1) > 0;
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to check if service request exists", ex);
        }

        return false;
    }

    public List<ServiceRequest> getServiceRequestList(String username) {
        List<ServiceRequest> serviceRequests = new ArrayList<>();
        String query = """
            SELECT sr.ServiceRequestId, sr.StatusId, ds.StatusName, sr.IssueDescription, sr.RequestDate, 
                   u.Username AS ClientName, d.DeviceId, d.Brand, d.Model, d.DeviceType, d.SerialNumber 
            FROM ServiceRequests sr
            INNER JOIN Devices d ON sr.DeviceId = d.DeviceId
            INNER JOIN DictionaryStatus ds ON sr.StatusId = ds.StatusId
            INNER JOIN Users u ON d.ClientId = u.Id
        """;

        boolean filterByUsername = username != null && !username.isBlank();

        if (filterByUsername) {
            query += " WHERE u.Username = ?";
        }

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);

            if (filterByUsername) {
                statement.setString(1, username);
            }

            var resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("ServiceRequestId");
                int statusId = resultSet.getInt("StatusId");
                String statusName = resultSet.getString("StatusName");
                String issueDescription = resultSet.getString("IssueDescription");
                Date requestDate = resultSet.getDate("RequestDate");
                String clientName = resultSet.getString("ClientName");

                int deviceId = resultSet.getInt("DeviceId");
                String brand = resultSet.getString("Brand");
                String model = resultSet.getString("Model");
                String deviceType = resultSet.getString("DeviceType");
                String serialNumber = resultSet.getString("SerialNumber");

                Device device = new Device(deviceId, brand, model, deviceType, serialNumber, clientName);
                ServiceRequest serviceRequest = new ServiceRequest(
                        id, statusId, statusName, issueDescription, requestDate, clientName, device
                );

                serviceRequests.add(serviceRequest);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch service requests", ex);
        }

        return serviceRequests;
    }

    public ServiceRequest addServiceRequest(ServiceRequestAddRequest request) {
        String query = "INSERT INTO ServiceRequests (DeviceId, StatusId, IssueDescription, RequestDate) VALUES (?, ?, ?, ?)";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, request.deviceId());
            statement.setInt(2, 1);
            statement.setString(3, request.issueDescription());
            statement.setDate(4, new java.sql.Date(new Date().getTime()));

            statement.executeUpdate();
            connection.commit();

            return new ServiceRequest(
                    0, 1, "Pending", request.issueDescription(), new Date(), "", null
            );
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add service request", ex);
        }
    }

    public boolean deleteServiceRequest(int serviceRequestId) {
        String query = "DELETE FROM ServiceRequests WHERE ServiceRequestId = ?";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, serviceRequestId);

            statement.executeUpdate();
            connection.commit();

            return true;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete service request", ex);
        }
    }

    public boolean updateServiceRequestStatus(int serviceRequestId, int statusId) {
        String query = "UPDATE ServiceRequests SET StatusId = ? WHERE ServiceRequestId = ?";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, statusId);
            statement.setInt(2, serviceRequestId);

            statement.executeUpdate();
            connection.commit();

            return true;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update service request status", ex);
        }
    }

    public ServiceRequest getServiceRequest(int serviceRequestId) {
        String query = """
            SELECT sr.ServiceRequestId, sr.StatusId, ds.StatusName, sr.IssueDescription, sr.RequestDate, 
                   u.Username AS ClientName, d.DeviceId, d.Brand, d.Model, d.DeviceType, d.SerialNumber 
            FROM ServiceRequests sr
            INNER JOIN Devices d ON sr.DeviceId = d.DeviceId
            INNER JOIN DictionaryStatus ds ON sr.StatusId = ds.StatusId
            INNER JOIN Users u ON d.ClientId = u.Id
            WHERE sr.ServiceRequestId = ?
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, serviceRequestId);

            var resultSet = statement.executeQuery();

            if (resultSet.next()) {
                int id = resultSet.getInt("ServiceRequestId");
                int statusId = resultSet.getInt("StatusId");
                String statusName = resultSet.getString("StatusName");
                String issueDescription = resultSet.getString("IssueDescription");
                Date requestDate = resultSet.getDate("RequestDate");
                String clientName = resultSet.getString("ClientName");

                int deviceId = resultSet.getInt("DeviceId");
                String brand = resultSet.getString("Brand");
                String model = resultSet.getString("Model");
                String deviceType = resultSet.getString("DeviceType");
                String serialNumber = resultSet.getString("SerialNumber");

                Device device = new Device(deviceId, brand, model, deviceType, serialNumber, clientName);
                return new ServiceRequest(
                        id, statusId, statusName, issueDescription, requestDate, clientName, device
                );
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch service request", ex);
        }

        return null;
    }
}

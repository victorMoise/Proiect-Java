package victor.java.repository.ServiceLog;

import org.springframework.stereotype.Repository;
import victor.java.api.model.Device;
import victor.java.api.model.ServiceLog;
import victor.java.api.model.ServiceRequest;
import victor.java.api.model.ServiceType;
import victor.java.api.request.ServiceLogAddRequest;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ServiceLogRepository implements IServiceLogRepository {
    private final DatabaseManager databaseManager;

    public ServiceLogRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @Override
    public List<ServiceType> getServiceTypeList() {
        List<ServiceType> serviceTypes = new ArrayList<>();
        String query = "SELECT * FROM DictionaryServiceType";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);

            var resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("ServiceTypeId");
                String code  = resultSet.getString("Code");
                String name = resultSet.getString("Name");
                double price = resultSet.getDouble("Price");

                ServiceType serviceType = new ServiceType(id, name, code, price);

                serviceTypes.add(serviceType);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch service requests", ex);
        }

        return serviceTypes;
    }

    @Override
    public boolean addServiceLog(int technicianId, ServiceLogAddRequest request) {
        String query = """
            INSERT INTO ServiceLogs (ServiceRequestId, TechnicianId, ServiceDate, Notes, ServiceTypeId)
            VALUES (?, ?, ?, ?, ?)
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);

            statement.setInt(1, request.serviceRequestId());
            statement.setInt(2, technicianId);
            statement.setDate(3, new java.sql.Date(new Date().getTime()));
            statement.setString(4, request.notes());
            statement.setInt(5, request.serviceTypeId());

            return statement.executeUpdate() > 0;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add service log", ex);
        }
    }

    @Override
    public List<ServiceLog> getServiceLogList(String username) {
        List<ServiceLog> serviceLogs = new ArrayList<>();
        String query = """
            SELECT
                sl.ServiceLogId,
                d.Brand + ' ' + d.Model AS DeviceName,
                st.Name as ServiceTypeName,
                sl.ServiceDate,
                sl.Notes,
                u.Username as ClientUsername
            FROM ServiceLogs sl
            INNER JOIN ServiceRequests sr ON sl.ServiceRequestId = sr.ServiceRequestId
            INNER JOIN Devices d ON sr.DeviceId = d.DeviceId
            INNER JOIN Users u ON u.Id = d.ClientId
            INNER JOIN DictionaryServiceType st ON sl.ServiceTypeId = st.ServiceTypeId
            WHERE u.Username = ?
            ORDER BY sl.ServiceDate DESC
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setString(1, username);

            var resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("ServiceLogId");
                String deviceName = resultSet.getString("DeviceName");
                String serviceTypeName = resultSet.getString("ServiceTypeName");
                Date serviceDate = resultSet.getDate("ServiceDate");
                String notes = resultSet.getString("Notes");
                String clientUsername = resultSet.getString("ClientUsername");

                ServiceLog serviceLog = new ServiceLog(id, deviceName, clientUsername, serviceDate, notes, serviceTypeName);

                serviceLogs.add(serviceLog);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch service requests", ex);
        }

        return serviceLogs;
    }

    @Override
    public boolean deleteServiceLog(int serviceLogId) {
        String query = "DELETE FROM ServiceLogs WHERE ServiceLogId = ?";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, serviceLogId);

            return statement.executeUpdate() > 0;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete service log", ex);
        }
    }

    @Override
    public List<ServiceLog> getServiceLogList(int serviceRequestId) {
        List<ServiceLog> serviceLogs = new ArrayList<>();
        String query = """
            SELECT
                sl.ServiceLogId,
                d.Brand + ' ' + d.Model AS DeviceName,
                st.Name as ServiceTypeName,
                sl.ServiceDate,
                sl.Notes,
                u.Username as ClientUsername
            FROM ServiceLogs sl
            INNER JOIN ServiceRequests sr ON sl.ServiceRequestId = sr.ServiceRequestId
            INNER JOIN Devices d ON sr.DeviceId = d.DeviceId
            INNER JOIN Users u ON u.Id = d.ClientId
            INNER JOIN DictionaryServiceType st ON sl.ServiceTypeId = st.ServiceTypeId
            WHERE sr.ServiceRequestId = ?
            ORDER BY sl.ServiceDate DESC
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, serviceRequestId);

            var resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("ServiceLogId");
                String deviceName = resultSet.getString("DeviceName");
                String serviceTypeName = resultSet.getString("ServiceTypeName");
                Date serviceDate = resultSet.getDate("ServiceDate");
                String notes = resultSet.getString("Notes");
                String clientUsername = resultSet.getString("ClientUsername");

                ServiceLog serviceLog = new ServiceLog(id, deviceName, clientUsername, serviceDate, notes, serviceTypeName);

                serviceLogs.add(serviceLog);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch service requests", ex);
        }

        return serviceLogs;
    }
}

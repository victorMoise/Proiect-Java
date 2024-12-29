package victor.java.repository.ServiceRequest;

import org.springframework.stereotype.Repository;
import victor.java.repository.DatabaseManager;

@Repository
public class ServiceRequestRepository implements IServiceRequestRepository {
    private final DatabaseManager databaseManager;

    public ServiceRequestRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    public boolean hasServiceRequest(int serviceRequestId) {
        String query = "SELECT COUNT(*) FROM ServiceRequests WHERE DeviceId = ?";

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setInt(1, serviceRequestId);

            var resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt(1) > 0;
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to check if service request exists", ex);
        }

        return false;
    }
}

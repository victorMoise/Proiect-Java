package victor.java.repository.Statistics;

import org.springframework.stereotype.Repository;
import victor.java.api.model.LastTechnicianServiceLogDate;
import victor.java.api.model.RankingItem;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StatisticsRepository implements IStatisticsRepository {
    private final DatabaseManager databaseManager;

    public StatisticsRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @Override
    public List<RankingItem> getAboveAverageTechnicians() {
        String query = """
            WITH AvgServices AS (
                SELECT CAST(AVG(NumOfServices) AS DOUBLE PRECISION) AS AverageServices
                FROM (
                    SELECT COUNT(*) AS NumOfServices
                    FROM ServiceLogs
                    GROUP BY TechnicianID
                ) AS T
            )
            SELECT
                u.Username, 
                COUNT(*) AS NumberOfServices,
                (SELECT AverageServices FROM AvgServices) AS AverageServices
            FROM Users u
            INNER JOIN ServiceLogs sl ON u.Id = sl.TechnicianID
            GROUP BY u.Username
            HAVING COUNT(*) >= (SELECT AverageServices FROM AvgServices);
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            var resultSet = statement.executeQuery();

            List<RankingItem> aboveAverageTechnicians = new ArrayList<>();
            int place = 0;

            while (resultSet.next()) {
                int numberOfServices = resultSet.getInt("NumberOfServices");
                double averageServices = resultSet.getDouble("AverageServices");
                String username = resultSet.getString("Username");

                RankingItem rankingItem = new RankingItem(++place, username, numberOfServices, averageServices);

                aboveAverageTechnicians.add(rankingItem);
            }

            return aboveAverageTechnicians;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get above average technicians", ex);
        }
    }

    @Override
    public List<RankingItem> getAboveAverageClients() {
        String query = """
            WITH AvgOrders AS (
                SELECT CAST(AVG(NumOfOrders) AS DOUBLE PRECISION) AS AverageOrders
                FROM (
                    SELECT COUNT(*) AS NumOfOrders
                    FROM ServiceRequests sr
                    INNER JOIN Devices d ON sr.DeviceID = d.DeviceID
                    INNER JOIN Users u ON d.ClientID = u.Id
                     GROUP BY u.Id
                ) AS T
            )
            SELECT
                u.Username,
                COUNT(*) AS NumberOfOrders,
                (SELECT AverageOrders FROM AvgOrders) AS AverageOrders
            FROM Users u
            INNER JOIN Devices d ON d.ClientID = u.Id
            INNER JOIN ServiceRequests sr ON sr.DeviceID = d.DeviceID
            GROUP BY u.Username
            HAVING COUNT(*) >= (SELECT AverageOrders FROM AvgOrders);
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            var resultSet = statement.executeQuery();

            List<RankingItem> aboveAverageTechnicians = new ArrayList<>();
            int place = 0;

            while (resultSet.next()) {
                int numberOfOrders = resultSet.getInt("NumberOfOrders");
                double averageOrders = resultSet.getDouble("AverageOrders");
                String username = resultSet.getString("Username");

                RankingItem rankingItem = new RankingItem(++place, username, numberOfOrders, averageOrders);

                aboveAverageTechnicians.add(rankingItem);
            }

            return aboveAverageTechnicians;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get above average technicians", ex);
        }
    }

    @Override
    public List<RankingItem> getTotalPaidByUsers() {
        String query = """
            SELECT *
            FROM (
                SELECT
                    U.Username,
                    (
                        SELECT SUM(I.Amount)
                        FROM Invoices I
                        WHERE I.PaymentStatusId = (
                            SELECT PaymentStatusId
                            FROM DictionaryPaymentStatus DPS
                            WHERE DPS.Name = 'Complete'
                        )
                        AND I.ServiceRequestID IN (
                            SELECT SR.ServiceRequestID
                            FROM ServiceRequests SR
                            WHERE SR.DeviceID IN (
                                SELECT D.DeviceID
                                FROM Devices D
                                WHERE D.ClientID = U.Id
                            )
                        )
                    ) AS TotalPaidAmount
                FROM
                    Users U
            ) AS Subquery
            WHERE
                TotalPaidAmount IS NOT NULL;
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            var resultSet = statement.executeQuery();

            List<RankingItem> totalPaidByUsers = new ArrayList<>();
            int place = 0;

            while (resultSet.next()) {
                double totalPaidAmount = resultSet.getDouble("TotalPaidAmount");
                String username = resultSet.getString("Username");

                RankingItem rankingItem = new RankingItem(++place, username, totalPaidAmount);

                totalPaidByUsers.add(rankingItem);
            }

            return totalPaidByUsers;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get total paid by users", ex);
        }
    }

    @Override
    public List<LastTechnicianServiceLogDate> getLastTechnicianLog() {
        String query = """
            SELECT
                U.Username as TechnicianUsername,
                SL.ServiceDate,
                DST.Name AS ServiceType
            FROM
                ServiceLogs SL
            INNER JOIN
                Users U ON SL.TechnicianID = U.Id
            INNER JOIN
                DictionaryServiceType DST ON SL.ServiceTypeId = DST.ServiceTypeId
            WHERE
                SL.ServiceLogID = (
                    SELECT TOP 1 SL2.ServiceLogID
                    FROM ServiceLogs SL2
                    WHERE SL2.TechnicianID = SL.TechnicianID
                    ORDER BY SL2.ServiceDate DESC, SL2.ServiceLogID DESC
                );
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            var resultSet = statement.executeQuery();

            List<LastTechnicianServiceLogDate> lastTechnicianLog = new ArrayList<>();

            while (resultSet.next()) {
                String technicianUsername = resultSet.getString("TechnicianUsername");
                String serviceType = resultSet.getString("ServiceType");
                String serviceDate = resultSet.getString("ServiceDate");

                LastTechnicianServiceLogDate lastTechnicianServiceLogDate = new LastTechnicianServiceLogDate(technicianUsername, serviceDate, serviceType);

                lastTechnicianLog.add(lastTechnicianServiceLogDate);
            }

            return lastTechnicianLog;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get last technician log", ex);
        }
    }
}

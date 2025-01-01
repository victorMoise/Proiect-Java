package victor.java.repository.Statistics;

import org.springframework.stereotype.Repository;
import victor.java.api.model.TechnicianRankingItem;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class StatisticsRepository implements IStatisticsRepository {
    private final DatabaseManager databaseManager;

    public StatisticsRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @Override
    public List<Object> getAboveAverageTechnicians() {
        String query = """
            WITH AvgServices AS (
                SELECT AVG(NumOfServices) AS AverageServices
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

            List<Object> aboveAverageTechnicians = new ArrayList<>();
            int place = 0;

            while (resultSet.next()) {
                int numberOfServices = resultSet.getInt("NumberOfServices");
                int averageServices = resultSet.getInt("AverageServices");
                String username = resultSet.getString("Username");

                TechnicianRankingItem technicianRankingItem = new TechnicianRankingItem(++place, username, numberOfServices, averageServices);

                aboveAverageTechnicians.add(technicianRankingItem);
            }

            return aboveAverageTechnicians;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get above average technicians", ex);
        }
    }
}

package victor.java.repository.Statistics;

import victor.java.api.model.LastTechnicianServiceLogDate;
import victor.java.api.model.RankingItem;

import java.util.List;

public interface IStatisticsRepository {
    List<RankingItem> getAboveAverageTechnicians();
    List<RankingItem> getAboveAverageClients();
    List<RankingItem> getTotalPaidByUsers();
    List<LastTechnicianServiceLogDate> getLastTechnicianLog();
}

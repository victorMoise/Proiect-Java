package victor.java.repository.Statistics;

import victor.java.api.model.RankingItem;

import java.util.List;

public interface IStatisticsRepository {
    List<RankingItem> getAboveAverageTechnicians();
    List<RankingItem> getAboveAverageClients();
}

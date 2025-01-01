package victor.java.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.RankingItem;
import victor.java.repository.Statistics.IStatisticsRepository;

import java.util.List;

@Service
public class StatisticsService {
    private final IStatisticsRepository statisticsRepository;

    public StatisticsService(IStatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    public ResponseEntity<?> getAboveAverageTechnicians() {
        List<RankingItem> aboveAverageTechnicians = statisticsRepository.getAboveAverageTechnicians();

        return ResponseEntity.ok(aboveAverageTechnicians);
    }

    public ResponseEntity<?> getAboveAverageClients() {
        List<RankingItem> aboveAverageClients = statisticsRepository.getAboveAverageClients();

        return ResponseEntity.ok(aboveAverageClients);
    }
}

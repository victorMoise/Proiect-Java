package victor.java.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.repository.Statistics.IStatisticsRepository;
import victor.java.repository.User.UserRepository;

import java.util.List;

@Service
public class StatisticsService {
    private final IStatisticsRepository statisticsRepository;
    private final UserRepository userRepository;

    public StatisticsService(IStatisticsRepository statisticsRepository, UserRepository userRepository) {
        this.statisticsRepository = statisticsRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> getAboveAverageTechnicians() {
        List<Object> aboveAverageTechnicians = statisticsRepository.getAboveAverageTechnicians();

        return ResponseEntity.ok(aboveAverageTechnicians);
    }
}

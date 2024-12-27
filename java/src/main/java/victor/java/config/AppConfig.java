package victor.java.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import victor.java.repository.DatabaseManager;

@Configuration
public class AppConfig {

    @Bean
    public DatabaseManager databaseManager() {
        return new DatabaseManager();
    }
}


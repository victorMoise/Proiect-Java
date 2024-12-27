package victor.java.repository.User;

import org.springframework.stereotype.Repository;
import victor.java.api.model.User;
import victor.java.repository.DatabaseManager;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository implements IUserRepository {
    private final DatabaseManager databaseManager;

    public UserRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        String query = "SELECT * FROM Users";

        try {
            var statement = databaseManager.getConnection().createStatement();
            var resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String email = resultSet.getString("email");
                String username = resultSet.getString("username");
                String password = resultSet.getString("passwordHash");

                users.add(new User(id, email, username, password));
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get users", ex);
        }

        return users;
    }

    public User getUser(String username) {
        return getUsers().stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
}

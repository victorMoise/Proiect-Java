package victor.java.repository.User;

import org.springframework.stereotype.Repository;
import victor.java.api.model.User;
import victor.java.repository.DatabaseManager;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    public boolean addUser(String username, String email, String passwordHash) {
        String query = "INSERT INTO Users (username, email, passwordHash, createdAt, roleId) VALUES (?, ?, ?, ?, ?)";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setString(1, username);
            statement.setString(2, email);
            statement.setString(3, passwordHash);

            String date = sdf.format(new Date());
            statement.setString(4, date);

            // By default, the user is registered as a client
            // 1 - admin, 2 - client, 3 - technician
            statement.setInt(5, 2);

            return statement.executeUpdate() > 0;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add user", ex);
        }
    }
}

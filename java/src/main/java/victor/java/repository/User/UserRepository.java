package victor.java.repository.User;

import org.springframework.stereotype.Repository;
import victor.java.api.model.User;
import victor.java.api.request.UserUpdateRequest;
import victor.java.repository.DatabaseManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
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
                Date createdAt = resultSet.getDate("createdAt");
                String firstName = resultSet.getString("firstName");
                String lastName = resultSet.getString("lastName");
                String phoneNumber = resultSet.getString("phoneNumber");
                String address = resultSet.getString("address");

                users.add(new User(id, email, username, password, createdAt, firstName, lastName, phoneNumber, address));
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

    public String getUserRole(String username) {
        String query = "SELECT dr.Name FROM Users u INNER JOIN DictionaryRoles dr ON u.RoleId = dr.RoleId WHERE u.Username = ?";

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setString(1, username);

            var resultSet = statement.executeQuery();
            resultSet.next();

            return resultSet.getString("Name");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get user role", ex);
        }
    }

    public boolean updateUser(String usernameRequest, UserUpdateRequest request) {
        String query = "UPDATE Users SET Username = ?, Email = ?, FirstName = ?, LastName = ?, PhoneNumber = ?, Address = ? WHERE Username = ?";

        Connection connection = null;
        PreparedStatement statement = null;

        try {
            // Get the connection manually
            connection = databaseManager.getConnection();
            statement = connection.prepareStatement(query);

            // Use a helper method to handle null values
            statement.setString(1, request.username());
            statement.setString(2, request.email());
            statement.setString(3, request.firstName());
            statement.setString(4, request.lastName());
            statement.setString(5, request.phoneNumber());
            statement.setString(6, request.address());
            statement.setString(7, usernameRequest);

            int rowsUpdated = statement.executeUpdate();

            // Ensure the transaction is committed if auto-commit is disabled
            if (!connection.getAutoCommit()) {
                connection.commit();
            }

            return rowsUpdated > 0;
        } catch (Exception ex) {
            // Log the exception (use a logging framework in real applications)
            System.err.println("Failed to update user: " + ex.getMessage());
            ex.printStackTrace();

            // Rethrow the exception or handle it as needed
            throw new RuntimeException("Failed to update user", ex);
        } finally {
            // Close only the statement, not the connection
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (Exception ex) {
                // Log or handle closing exceptions
                System.err.println("Failed to close statement: " + ex.getMessage());
            }
        }
    }


    private String nullToEmpty(String value) {
        return value == null ? "" : value;
    }
}

package victor.java.repository.User;

import org.springframework.stereotype.Repository;
import victor.java.api.model.Role;
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
        String query = "SELECT *, dr.Name FROM Users u INNER JOIN DictionaryRoles dr on u.RoleId = dr.RoleId";

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
                String role = resultSet.getString("Name");

                users.add(new User(id, email, username, password, createdAt, firstName, lastName, phoneNumber, address, role));
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
            connection = databaseManager.getConnection();
            statement = connection.prepareStatement(query);

            statement.setString(1, request.username());
            statement.setString(2, request.email());
            statement.setString(3, request.firstName());
            statement.setString(4, request.lastName());
            statement.setString(5, request.phoneNumber());
            statement.setString(6, request.address());
            statement.setString(7, usernameRequest);

            int rowsUpdated = statement.executeUpdate();

            if (!connection.getAutoCommit()) {
                connection.commit();
            }

            return rowsUpdated > 0;
        } catch (Exception ex) {
            System.err.println("Failed to update user: " + ex.getMessage());
            ex.printStackTrace();

            throw new RuntimeException("Failed to update user", ex);
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (Exception ex) {
                System.err.println("Failed to close statement: " + ex.getMessage());
            }
        }
    }

    public List<Role> getRoles() {
        List<Role> roles = new ArrayList<>();
        String query = "SELECT * FROM DictionaryRoles";

        try {
            var statement = databaseManager.getConnection().createStatement();
            var resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                int id = resultSet.getInt("RoleId");
                String name = resultSet.getString("Name");
                String code = resultSet.getString("Code");

                roles.add(new Role(id, name, code));
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get roles", ex);
        }

        return roles;
    }

    public Role getRole(String roleName) {
        return getRoles().stream()
                .filter(r -> r.getName().equals(roleName))
                .findFirst()
                .orElse(null);
    }

    public boolean updateRole(String username, int roleId) {
        String query = "UPDATE Users SET RoleId = ? WHERE Username = ?";

        try {
            var statement = databaseManager.getConnection().prepareStatement(query);
            statement.setInt(1, roleId);
            statement.setString(2, username);

            return statement.executeUpdate() > 0;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update user role", ex);
        }
    }
}

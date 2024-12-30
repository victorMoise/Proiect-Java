package victor.java.repository;

import java.sql.*;

public class DatabaseManager {
    private final Connection connection;

    public DatabaseManager() {
        try {
            String url = "jdbc:sqlserver://localhost;databaseName=MyDatabase;trustServerCertificate=true;";
            String username = "user_java";
            String password = "password_java";
            connection = DriverManager.getConnection(url, username, password);
            System.out.println("Database connection established");
        } catch (SQLException ex) {
            throw new RuntimeException("Failed to connect to database", ex);
        }
    }

    public Connection getConnection() {
        return connection;
    }

    // Method to close the database connection
    // Not used, maybe in the future it might be useful
    public void closeConnection() {
        try {
            connection.close();
            System.out.println("Connection closed");
        } catch (SQLException ex) {
            throw new RuntimeException("Failed to close connection", ex);
        }
    }
}

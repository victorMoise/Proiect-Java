package victor.java.repository.User;

import victor.java.api.model.User;

import java.util.List;

public interface IUserRepository {
    public List<User> getUsers();
    public User getUser(String username);
    public boolean addUser(String username, String email, String passwordHash);
}
package victor.java.repository.User;

import victor.java.api.model.Role;
import victor.java.api.model.User;
import victor.java.api.request.UserUpdateRequest;

import java.util.List;

public interface IUserRepository {
    List<User> getUsers();
    User getUser(String username);
    boolean addUser(String username, String email, String passwordHash);
    String getUserRole(String username);
    boolean updateUser(String usernameRequest, UserUpdateRequest request);
    List<Role> getRoles();
    Role getRole(String roleName);
    boolean updateRole(String username, int roleId);
}
package victor.java.service;

import org.springframework.stereotype.Service;
import victor.java.api.model.User;
import victor.java.repository.User.IUserRepository;

import java.util.List;

@Service
public class UserService {
    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.getUsers();
    }
}
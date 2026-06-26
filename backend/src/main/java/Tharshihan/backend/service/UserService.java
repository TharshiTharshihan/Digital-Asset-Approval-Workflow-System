package Tharshihan.backend.service;

import Tharshihan.backend.enums.Role;
import Tharshihan.backend.model.User;
import Tharshihan.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;


    public List<User> getAllMangers() {
        return userRepo.findByRole(Role.MANAGER);

    }
}

package Tharshihan.backend.service;

import Tharshihan.backend.dto.LoginRequest;
import Tharshihan.backend.dto.LoginResponse;
import Tharshihan.backend.dto.RegisterRequest;
import Tharshihan.backend.enums.Role;
import Tharshihan.backend.model.User;
import Tharshihan.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;
    private final PasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public String register(RegisterRequest request){
        if (userRepo.findByEmail(request.getEmail()).isPresent()){
            return "Email is exist";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.EMPLOYEE);

        userRepo.save(user);
        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                "Login Successful"


        );
    }
}

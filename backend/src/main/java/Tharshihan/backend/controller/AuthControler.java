package Tharshihan.backend.controller;

import Tharshihan.backend.dto.LoginRequest;
import Tharshihan.backend.dto.LoginResponse;
import Tharshihan.backend.dto.RegisterRequest;
import Tharshihan.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthControler {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
        public ResponseEntity<String> register(@RequestBody RegisterRequest request){

        return ResponseEntity.ok(authService.register(request));

    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}

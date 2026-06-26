package Tharshihan.backend.controller;


import Tharshihan.backend.model.User;
import Tharshihan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
        private UserService userService;

    @GetMapping("/managers")
    public ResponseEntity<List<User>>getAllMangers(){
        List<User> managers = userService.getAllMangers();
        return  ResponseEntity.ok(managers);

    }


}

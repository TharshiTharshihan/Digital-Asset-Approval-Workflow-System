package Tharshihan.backend.repo;

import Tharshihan.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import Tharshihan.backend.enums.Role;
//import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);


}
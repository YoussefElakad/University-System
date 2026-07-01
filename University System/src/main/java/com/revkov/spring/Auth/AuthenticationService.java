package com.revkov.spring.Auth;

import com.revkov.spring.Config.JwtService;
import com.revkov.spring.Doctors.Doctor;
import com.revkov.spring.Doctors.DoctorRep;
import com.revkov.spring.Students.Student;
import com.revkov.spring.Students.StudentRep;
import com.revkov.spring.Users.Role;
import com.revkov.spring.Users.Users;
import com.revkov.spring.Users.UsersRep;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService
{
    private final UsersRep repu;
    private final StudentRep reps;
    private final DoctorRep repd;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authman;
    private final JwtService Js;


    public AuthenticationResponse register(RegisterRequest request)
    {
        if(request.getRole().equals("STUDENT"))
        {
            //Validations
            if(!reps.existsByStudentcode(request.getCode()))
            {
                throw new RuntimeException("Student Code Does Not Exist");
            }

            //Build the user
            Users user = Users.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.STUDENT)
                    .build();
            if(repu.existsByUsername(user.getUsername()))
            {
                throw new UsernameNotFoundException("User Name Already Exists");
            }
            repu.save(user);

            //Save student object
            Student s = reps.findByStudentcode(request.getCode()).get();

            s.setFirst_name(request.getFirst_name());
            s.setLast_name(request.getLast_name());
            s.setAge(request.getAge());
            s.setEmail(request.getEmail());
            s.setAddress(request.getAddress());
            s.setUsers(user);

            reps.save(s);

            //get the users token and role
            var jwtoken = Js.GenerateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwtoken)
                    .role(user.getAuthorities().iterator().next().getAuthority())
                    .build();
        }
        else
        {
            if(!repd.existsByDoctorcode(request.getCode()))
            {
                throw new RuntimeException("Doctor Code Does Not Exist");
            }
            //Build the user
            Users user = Users.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.DOCTOR)
                    .build();
            if(repu.existsByUsername(user.getUsername()))
            {
                throw new RuntimeException("User Name Already Exists");
            }
            repu.save(user);

            //Save Doctor object
            Doctor d = repd.findByDoctorcode(request.getCode()).get();
            d.setFirst_name(request.getFirst_name());
            d.setLast_name(request.getLast_name());
            d.setAge(request.getAge());
            d.setEmail(request.getEmail());
            d.setAddress(request.getAddress());
            d.setUsers(user);

            repd.save(d);

            //get the users token and role
            var jwtoken = Js.GenerateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwtoken)
                    .role(user.getAuthorities().iterator().next().getAuthority())
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request)
    {
        authman.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        Users user = repu.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        var jwtoken = Js.GenerateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtoken)
                .role(user.getAuthorities().iterator().next().getAuthority())
                .build();
    }
}

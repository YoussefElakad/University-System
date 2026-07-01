package com.revkov.spring.Auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthenticationService AS;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(AS.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authinticate(@Valid @RequestBody AuthenticationRequest request)
    {
        return ResponseEntity.ok(AS.authenticate(request));
    }
}

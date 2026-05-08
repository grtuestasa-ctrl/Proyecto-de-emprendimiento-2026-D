package com.tuempresa.microfinanzas.modules.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuempresa.microfinanzas.modules.auth.dto.JwtAuthResponseDTO;
import com.tuempresa.microfinanzas.modules.auth.dto.LoginRequestDTO;
import com.tuempresa.microfinanzas.security.JwtTokenProvider;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            // Esto verifica el usuario y contraseña contra tu UserDetailsServiceImpl
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Generamos el JWT real
            String jwt = tokenProvider.generarToken(authentication);
            
            return ResponseEntity.ok(new JwtAuthResponseDTO(jwt));

        } catch (BadCredentialsException e) {
            // ¡MAGIA APLICADA! Si falla la contraseña, devolvemos un 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
            
        } catch (Exception e) {
            // Si pasa cualquier otra cosa rara, devolvemos un 500 controlado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }
}
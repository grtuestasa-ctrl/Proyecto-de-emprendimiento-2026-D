package com.tuempresa.microfinanzas.modules.usuarios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.microfinanzas.modules.usuarios.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método clave para que tu seguridad encuentre al usuario por nombre
    Optional<Usuario> findByUsername(String username);
}
package com.tuempresa.microfinanzas.modules.usuarios.service;

import java.util.Optional;

import com.tuempresa.microfinanzas.modules.usuarios.entity.Usuario;

public interface UsuarioService {
    Optional<Usuario> buscarPorUsername(String username);
    // Aquí puedes agregar: Usuario guardarUsuario(Usuario usuario);
}
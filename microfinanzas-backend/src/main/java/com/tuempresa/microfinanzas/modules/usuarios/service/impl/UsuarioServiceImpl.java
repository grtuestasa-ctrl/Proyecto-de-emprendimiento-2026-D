package com.tuempresa.microfinanzas.modules.usuarios.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuempresa.microfinanzas.modules.usuarios.entity.Usuario;
import com.tuempresa.microfinanzas.modules.usuarios.repository.UsuarioRepository;
import com.tuempresa.microfinanzas.modules.usuarios.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
}
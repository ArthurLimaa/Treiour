package com.treiour.treiour.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.treiour.treiour.model.Usuario;
import com.treiour.treiour.repository.UsuarioRepository;
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario cadastrar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        Usuario usuario = repository.findByEmail(email);

        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }

        return null;
    }
}
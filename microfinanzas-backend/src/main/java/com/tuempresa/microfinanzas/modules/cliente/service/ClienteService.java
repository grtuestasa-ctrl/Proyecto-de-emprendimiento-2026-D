package com.tuempresa.microfinanzas.modules.cliente.service;

import com.tuempresa.microfinanzas.modules.cliente.dto.ClienteRequestDTO;
import com.tuempresa.microfinanzas.modules.cliente.dto.ClienteResponseDTO;
import java.util.List;

public interface ClienteService {
    ClienteResponseDTO registrar(ClienteRequestDTO request);
    List<ClienteResponseDTO> listarTodos();
    ClienteResponseDTO buscarPorId(Long id);
}
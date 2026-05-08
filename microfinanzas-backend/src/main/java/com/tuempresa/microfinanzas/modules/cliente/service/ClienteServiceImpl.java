package com.tuempresa.microfinanzas.modules.cliente.service;

import com.tuempresa.microfinanzas.modules.cliente.dto.ClienteRequestDTO;
import com.tuempresa.microfinanzas.modules.cliente.dto.ClienteResponseDTO;
import com.tuempresa.microfinanzas.modules.cliente.entity.Cliente;
import com.tuempresa.microfinanzas.modules.cliente.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public ClienteResponseDTO registrar(ClienteRequestDTO request) {
        if(clienteRepository.existsByDni(request.getDni())) {
            throw new RuntimeException("DNI ya registrado");
        }

        Cliente cliente = Cliente.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .email(request.getEmail())
                .telefono(request.getTelefono())
                .direccion(request.getDireccion())
                .scoreCrediticio(0) // Iniciamos con score base
                .build();

        Cliente guardado = clienteRepository.save(cliente);
        return mapToResponse(guardado);
    }

    @Override
    public List<ClienteResponseDTO> listarTodos() {
        return clienteRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ClienteResponseDTO buscarPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return mapToResponse(cliente);
    }

    // Método privado para convertir Entidad a DTO
    private ClienteResponseDTO mapToResponse(Cliente cliente) {
        return ClienteResponseDTO.builder()
                .id(cliente.getId())
                .dni(cliente.getDni())
                .nombreCompleto(cliente.getNombres() + " " + cliente.getApellidos())
                .email(cliente.getEmail())
                .estado(cliente.getEstado().name())
                .scoreCrediticio(cliente.getScoreCrediticio())
                .fechaRegistro(cliente.getFechaRegistro())
                .build();
    }
}
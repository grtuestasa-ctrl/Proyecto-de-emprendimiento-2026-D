package com.tuempresa.microfinanzas.modules.cliente.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ClienteResponseDTO {
    private Long id;
    private String dni;
    private String nombreCompleto;
    private String email;
    private String estado;
    private Integer scoreCrediticio;
    private LocalDateTime fechaRegistro;
}
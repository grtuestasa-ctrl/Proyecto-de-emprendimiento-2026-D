package com.tuempresa.microfinanzas.modules.auth.dto;

import lombok.Data;

@Data
public class JwtAuthResponseDTO {
    private String token;
    private String tipoToken = "Bearer";

    public JwtAuthResponseDTO(String token) {
        this.token = token;
    }
}
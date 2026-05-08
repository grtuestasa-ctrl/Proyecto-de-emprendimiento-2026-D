package com.tuempresa.microfinanzas.modules.prestamo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class SolicitudPrestamoDTO {
    @NotNull(message = "El ID del cliente es requerido")
    private Long clienteId;

    @Positive(message = "El monto debe ser mayor a cero")
    private BigDecimal monto;

    @Positive(message = "La tasa debe ser positiva")
    private BigDecimal tasaInteres;

    @Min(value = 1, message = "El plazo mínimo es 1 mes")
    private Integer plazoMeses;
}
package com.tuempresa.microfinanzas.modules.riesgo.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ReporteRiesgoDTO {
    private String dni;
    private Integer scoreFinal;
    private String nivelRiesgo; // BAJO, MEDIO, ALTO, CRITICO
    private boolean aprobado;
    private List<String> observaciones;
    private boolean anomaliaDetectada;
}
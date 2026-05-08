package com.tuempresa.microfinanzas.modules.riesgo.controller;

import com.tuempresa.microfinanzas.modules.riesgo.dto.ReporteRiesgoDTO;
import com.tuempresa.microfinanzas.modules.riesgo.service.EvaluacionCrediticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/riesgo")
public class RiesgoController {

    @Autowired 
    private EvaluacionCrediticiaService evaluacionService;

    @GetMapping("/evaluar/{clienteId}")
    public ResponseEntity<ReporteRiesgoDTO> evaluar(@PathVariable Long clienteId) {
        return ResponseEntity.ok(evaluacionService.evaluarCliente(clienteId));
    }
}
package com.tuempresa.microfinanzas.modules.riesgo.service;

import com.tuempresa.microfinanzas.modules.cliente.entity.Cliente;
import com.tuempresa.microfinanzas.modules.cliente.repository.ClienteRepository;
import com.tuempresa.microfinanzas.modules.riesgo.dto.ReporteRiesgoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EvaluacionCrediticiaService {

    @Autowired private ClienteRepository clienteRepository;
    @Autowired private DetectorAnomaliasService detectorAnomaliasService;

    public ReporteRiesgoDTO evaluarCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        List<String> observaciones = new ArrayList<>();
        boolean anomalia = detectorAnomaliasService.verificarFraude(cliente.getDni());
        
        // Lógica de Scoring básica
        int score = 500; // Score base
        if (cliente.getTelefono() != null) score += 50;
        if (cliente.getDireccion() != null) score += 50;
        
        if (anomalia) {
            score = 0;
            observaciones.add("ALERTA: Posible anomalía detectada por el sistema de IA.");
        }

        String nivel = determinarNivel(score);
        boolean aprobado = score >= 400 && !anomalia;

        // Actualizamos el score en la base de datos del cliente
        cliente.setScoreCrediticio(score);
        clienteRepository.save(cliente);

        return ReporteRiesgoDTO.builder()
                .dni(cliente.getDni())
                .scoreFinal(score)
                .nivelRiesgo(nivel)
                .aprobado(aprobado)
                .observaciones(observaciones)
                .anomaliaDetectada(anomalia)
                .build();
    }

    private String determinarNivel(int score) {
        if (score < 200) return "CRITICO";
        if (score < 400) return "ALTO";
        if (score < 600) return "MEDIO";
        return "BAJO";
    }
}
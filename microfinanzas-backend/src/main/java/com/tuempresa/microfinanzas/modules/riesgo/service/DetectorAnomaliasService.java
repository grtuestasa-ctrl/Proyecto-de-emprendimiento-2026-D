package com.tuempresa.microfinanzas.modules.riesgo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DetectorAnomaliasService {

    private final WebClient webClient;

    @Value("${app.riesgo.modelo-anomalias-url}")
    private String aiServiceUrl;

    public DetectorAnomaliasService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public boolean verificarFraude(String dni) {
        try {
            // Simulamos la llamada al servicio de Redes Neuronales en Python
            // En el futuro, esto hará un POST real a aiServiceUrl
            return false; // Por defecto no hay fraude
        } catch (Exception e) {
            return false; 
        }
    }
}
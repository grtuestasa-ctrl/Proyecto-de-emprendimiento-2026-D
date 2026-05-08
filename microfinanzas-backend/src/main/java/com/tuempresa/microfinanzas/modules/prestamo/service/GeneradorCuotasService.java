package com.tuempresa.microfinanzas.modules.prestamo.service;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Cuota;
import com.tuempresa.microfinanzas.modules.prestamo.entity.Prestamo;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class GeneradorCuotasService {
    public List<Cuota> generarCuotas(Prestamo prestamo) {
        List<Cuota> cuotas = new ArrayList<>();
        
        // CORRECCIÓN: Convertimos el Double de tasaInteres a BigDecimal para operar de forma segura
        BigDecimal tasaInteresDecimal = BigDecimal.valueOf(prestamo.getTasaInteres() / 100);
        
        // Cálculo básico: (Monto + Interés Total) / Plazo
        BigDecimal interesTotal = prestamo.getMonto()
                .multiply(tasaInteresDecimal)
                .multiply(new BigDecimal(prestamo.getPlazoMeses()));
        
        BigDecimal montoTotal = prestamo.getMonto().add(interesTotal);
        BigDecimal montoPorCuota = montoTotal.divide(new BigDecimal(prestamo.getPlazoMeses()), 2, RoundingMode.HALF_UP);

        for (int i = 1; i <= prestamo.getPlazoMeses(); i++) {
            Cuota cuota = Cuota.builder()
                    .prestamo(prestamo)
                    .numeroCuota(i)
                    .montoCuota(montoPorCuota)
                    .fechaVencimiento(LocalDate.now().plusMonths(i))
                    // CORRECCIÓN: Usando String literal en lugar del Enum que no existía
                    .estado("PENDIENTE") 
                    .build();
            cuotas.add(cuota);
        }
        return cuotas;
    }
}
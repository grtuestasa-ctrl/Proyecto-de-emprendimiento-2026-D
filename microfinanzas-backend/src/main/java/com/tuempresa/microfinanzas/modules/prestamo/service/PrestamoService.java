package com.tuempresa.microfinanzas.modules.prestamo.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Cuota;
import com.tuempresa.microfinanzas.modules.prestamo.entity.Prestamo;
import com.tuempresa.microfinanzas.modules.prestamo.repository.CuotaRepository;
import com.tuempresa.microfinanzas.modules.prestamo.repository.PrestamoRepository;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private CuotaRepository cuotaRepository;

    @Transactional
    public Prestamo crearPrestamo(Prestamo prestamo) {
        // 1. Guardamos el préstamo
        Prestamo guardado = prestamoRepository.save(prestamo);

        // 2. Calculamos la cuota (Interés simple para el ejemplo)
        BigDecimal totalInteres = guardado.getMonto()
                .multiply(BigDecimal.valueOf(guardado.getTasaInteres() / 100));
        BigDecimal montoTotal = guardado.getMonto().add(totalInteres);
        BigDecimal montoCuota = montoTotal.divide(BigDecimal.valueOf(guardado.getPlazoMeses()), 2, RoundingMode.HALF_UP);

        // 3. Generamos el cronograma de cuotas
        for (int i = 1; i <= guardado.getPlazoMeses(); i++) {
            Cuota cuota = new Cuota();
            cuota.setPrestamo(guardado);
            cuota.setNumeroCuota(i);
            cuota.setMontoCuota(montoCuota);
            cuota.setFechaVencimiento(guardado.getFechaInicio().plusMonths(i));
            cuota.setEstado("PENDIENTE");
            cuotaRepository.save(cuota);
        }

        return guardado;
    }

    // --- MÉTODOS AÑADIDOS PARA SOLUCIONAR ERRORES EN EL CONTROLLER ---

    @Transactional(readOnly = true)
    public List<Prestamo> listarTodos() {
        return prestamoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Prestamo buscarPorId(Long id) {
        return prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado con ID: " + id));
    }
}
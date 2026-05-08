package com.tuempresa.microfinanzas.modules.transaccion.service;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Cuota;
import com.tuempresa.microfinanzas.modules.prestamo.repository.CuotaRepository;
import com.tuempresa.microfinanzas.modules.transaccion.entity.Transaccion;
import com.tuempresa.microfinanzas.modules.transaccion.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProcesadorPagoService {

    @Autowired private TransaccionRepository transaccionRepository;
    @Autowired private CuotaRepository cuotaRepository;

    @Transactional
    public Transaccion procesarPagoCuota(Long cuotaId, Transaccion.MetodoPago metodo, String referencia) {
        // 1. Buscamos la cuota
        Cuota cuota = cuotaRepository.findById(cuotaId)
                .orElseThrow(() -> new RuntimeException("Cuota no encontrada"));

        // CORRECCIÓN: Comparamos usando String ya que el estado es un String en tu entidad
        if ("PAGADO".equals(cuota.getEstado())) {
            throw new RuntimeException("Esta cuota ya ha sido cancelada anteriormente");
        }

        // 2. Creamos el registro de la transacción
        Transaccion transaccion = Transaccion.builder()
                .cuota(cuota)
                .montoPagado(cuota.getMontoCuota())
                .metodoPago(metodo)
                .codigoReferencia(referencia)
                .estado(Transaccion.EstadoTransaccion.PROCESADA)
                .build();

        // 3. Actualizamos el estado de la cuota usando String
        cuota.setEstado("PAGADO");
        cuotaRepository.save(cuota);

        return transaccionRepository.save(transaccion);
    }
}
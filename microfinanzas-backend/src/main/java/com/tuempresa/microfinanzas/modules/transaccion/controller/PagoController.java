package com.tuempresa.microfinanzas.modules.transaccion.controller;

import com.tuempresa.microfinanzas.modules.transaccion.entity.Transaccion;
import com.tuempresa.microfinanzas.modules.transaccion.service.ProcesadorPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pagos")
public class PagoController {

    @Autowired 
    private ProcesadorPagoService pagoService;

    @PostMapping("/cuota/{cuotaId}")
    public ResponseEntity<Transaccion> pagarCuota(
            @PathVariable Long cuotaId,
            @RequestParam Transaccion.MetodoPago metodo,
            @RequestParam(required = false) String referencia) {
        
        return ResponseEntity.ok(pagoService.procesarPagoCuota(cuotaId, metodo, referencia));
    }
}
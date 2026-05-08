package com.tuempresa.microfinanzas.modules.prestamo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuempresa.microfinanzas.modules.cliente.entity.Cliente;
import com.tuempresa.microfinanzas.modules.prestamo.dto.SolicitudPrestamoDTO;
import com.tuempresa.microfinanzas.modules.prestamo.entity.Prestamo;
import com.tuempresa.microfinanzas.modules.prestamo.service.PrestamoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<Prestamo> crear(@Valid @RequestBody SolicitudPrestamoDTO solicitud) {
        Prestamo prestamo = Prestamo.builder()
                .monto(solicitud.getMonto())
                // CORRECCIÓN: Convertimos el BigDecimal del DTO al Double que requiere la Entidad
                .tasaInteres(solicitud.getTasaInteres().doubleValue())
                .plazoMeses(solicitud.getPlazoMeses())
                // Vinculamos el cliente creando una entidad temporal solo con el ID
                .cliente(Cliente.builder().id(solicitud.getClienteId()).build())
                .build();

        return ResponseEntity.ok(prestamoService.crearPrestamo(prestamo));
    }

    @GetMapping
    public ResponseEntity<List<Prestamo>> listarTodos() {
        return ResponseEntity.ok(prestamoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prestamo> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(prestamoService.buscarPorId(id));
    }
}
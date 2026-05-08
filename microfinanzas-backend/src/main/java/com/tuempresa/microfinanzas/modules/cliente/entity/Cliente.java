package com.tuempresa.microfinanzas.modules.cliente.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes", schema = "dbo")
@Data // Genera Getters, Setters, toString, equals y hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder // Para que funcione Cliente.builder()
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 8, unique = true)
    private String dni;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false, length = 15)
    private String telefono;

    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoCliente estado;

    private Integer scoreCrediticio;

    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
        if (this.estado == null) this.estado = EstadoCliente.EN_EVALUACION;
    }

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    public enum EstadoCliente {
        ACTIVO, INACTIVO, EN_EVALUACION, BLOQUEADO
    }
}
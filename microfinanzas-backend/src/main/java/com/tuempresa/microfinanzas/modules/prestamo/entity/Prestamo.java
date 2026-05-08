package com.tuempresa.microfinanzas.modules.prestamo.entity;

import com.tuempresa.microfinanzas.modules.cliente.entity.Cliente;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "prestamos", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false)
    private Double tasaInteres;

    @Column(nullable = false)
    private Integer plazoMeses;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(nullable = false)
    private String estado; // ACTIVO, FINALIZADO, MOROSO

    @PrePersist
    protected void onCreate() {
        if (this.fechaInicio == null) this.fechaInicio = LocalDate.now();
        if (this.estado == null) this.estado = "ACTIVO";
    }
}
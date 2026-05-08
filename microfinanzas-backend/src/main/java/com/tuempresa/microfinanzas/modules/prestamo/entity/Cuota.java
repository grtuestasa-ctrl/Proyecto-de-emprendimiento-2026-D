package com.tuempresa.microfinanzas.modules.prestamo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "cuotas", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prestamo_id", nullable = false)
    private Prestamo prestamo;

    @Column(nullable = false)
    private Integer numeroCuota;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal montoCuota;

    @Column(nullable = false)
    private LocalDate fechaVencimiento;

    @Column(nullable = false)
    private String estado; // PENDIENTE, PAGADO, VENCIDO

    @PrePersist
    protected void onCreate() {
        if (this.estado == null) this.estado = "PENDIENTE";
    }
}
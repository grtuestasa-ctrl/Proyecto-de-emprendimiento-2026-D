package com.tuempresa.microfinanzas.modules.transaccion.entity;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Cuota;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones", schema = "dbo")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Vinculamos la transacción a la cuota específica que se está pagando
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuota_id", nullable = false)
    private Cuota cuota;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal montoPagado;

    @Column(nullable = false)
    private LocalDateTime fechaTransaccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MetodoPago metodoPago;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoTransaccion estado;

    private String codigoReferencia; // Ej: ID de operación de Yape o Plin

    @PrePersist
    protected void onCreate() {
        fechaTransaccion = LocalDateTime.now();
    }

    public enum MetodoPago {
        EFECTIVO, TRANSFERENCIA, YAPE, PLIN, TARJETA
    }

    public enum EstadoTransaccion {
        PROCESADA, PENDIENTE, FALLIDA, REVERTIDA
    }
}
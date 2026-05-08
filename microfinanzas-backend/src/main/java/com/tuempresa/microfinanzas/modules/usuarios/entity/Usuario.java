package com.tuempresa.microfinanzas.modules.usuarios.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String rol;
}
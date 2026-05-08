package com.tuempresa.microfinanzas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaAuditing // Permite el uso de @CreatedDate y @LastModifiedDate
public class DatabaseConfig {
    // Aquí podrías configurar Beans específicos para SQL Server si fuera necesario
    // manejar múltiples fuentes de datos en el futuro.
}
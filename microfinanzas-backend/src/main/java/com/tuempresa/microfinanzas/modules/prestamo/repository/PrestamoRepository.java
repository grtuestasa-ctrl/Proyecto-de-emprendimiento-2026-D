package com.tuempresa.microfinanzas.modules.prestamo.repository;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
}
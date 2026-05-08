package com.tuempresa.microfinanzas.modules.prestamo.repository;

import com.tuempresa.microfinanzas.modules.prestamo.entity.Cuota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuotaRepository extends JpaRepository<Cuota, Long> {}
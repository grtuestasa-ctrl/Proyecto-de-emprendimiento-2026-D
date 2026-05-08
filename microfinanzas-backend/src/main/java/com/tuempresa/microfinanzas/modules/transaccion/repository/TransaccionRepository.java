package com.tuempresa.microfinanzas.modules.transaccion.repository;

import com.tuempresa.microfinanzas.modules.transaccion.entity.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
    List<Transaccion> findByCuotaId(Long cuotaId);
}
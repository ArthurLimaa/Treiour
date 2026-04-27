package com.treiour.treiour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.treiour.treiour.model.Treino;

public interface TreinoRepository extends JpaRepository<Treino, Long> {
    void deleteByName(String name);
    Treino findByName(String name);
    
}

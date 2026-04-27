package com.treiour.treiour.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.treiour.treiour.model.Treino;
import com.treiour.treiour.repository.TreinoRepository;

@Service
public class TreinoService {

    @Autowired
    private TreinoRepository treinoRepository;

    public Treino criarTreino(Treino treino) {
        return treinoRepository.save(treino);
    }

    public Treino editaTreinor(Treino treino) {
        return treinoRepository.save(treino);
    }

    public void deletarTreino(String name) {
        treinoRepository.deleteByName(name);
    }


}

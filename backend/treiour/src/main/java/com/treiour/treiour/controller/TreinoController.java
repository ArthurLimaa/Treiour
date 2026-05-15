package com.treiour.treiour.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.treiour.treiour.model.Treino;
import com.treiour.treiour.service.TreinoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/treino")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @PostMapping
    public Treino criarTreino(@RequestBody Treino treino) {
        return treinoService.criarTreino(treino);
    }

    @GetMapping
    public List<Treino> listarTreinos() {
        return treinoService.listarTreinos();
    }

    @DeleteMapping("/{id}")
    public void deletarTreino(@PathVariable Long id) {
        treinoService.deletarTreino(id);
    }
}
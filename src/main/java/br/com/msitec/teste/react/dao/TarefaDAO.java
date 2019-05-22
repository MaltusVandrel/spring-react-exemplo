package br.com.msitec.teste.react.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.msitec.teste.react.model.Tarefa;

public interface TarefaDAO extends JpaRepository<Tarefa, Long> {}
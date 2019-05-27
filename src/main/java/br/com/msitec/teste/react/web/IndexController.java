package br.com.msitec.teste.react.web;

import javax.inject.Inject;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.msitec.teste.react.ajax.Grid;
import br.com.msitec.teste.react.dao.TarefaDAO;
import br.com.msitec.teste.react.model.Tarefa;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/")
public class IndexController {

	@Inject private TarefaDAO tarefaDAO; 
    
    @PostMapping(value="/grid",produces = "application/json")
    @ResponseBody
    public Page<Tarefa> grid(@RequestBody Grid<Tarefa> grid) {
    	if(grid.getObject()==null)grid.setObject(new Tarefa(true));
    	Example<Tarefa> example = Example.of(grid.getObject(),ExampleMatcher
				.matching()
				.withIgnoreNullValues()
    			.withMatcher("titulo", ExampleMatcher.GenericPropertyMatchers.startsWith())
    			.withMatcher("descricao", ExampleMatcher.GenericPropertyMatchers.contains()));
    	PageRequest pageRequest = PageRequest.of(grid.getPage(),grid.getPerPage(),grid.getSort());
    	
    	return tarefaDAO.findAll(example, pageRequest);
    }
    
    @GetMapping("/add")
    @ResponseBody
    public Tarefa add() {
    	Tarefa tarefa = new Tarefa("Uma tarefa variavel","Essa tarefa serve mais para testar, em pouco tempo será necessario fazer o CRUD.");
    	tarefaDAO.save(tarefa);
    	return tarefa;
    }

}

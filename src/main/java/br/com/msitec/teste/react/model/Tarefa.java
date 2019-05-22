package br.com.msitec.teste.react.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
public class Tarefa {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	@Column(name="titulo", nullable=false)
	private String titulo;
	
	@Column(name="descricao", nullable=false)
	private String descricao;
	
	@Column(name="abertura", nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date abertura=new Date();
	
	@Column(name="fechamento")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechamento;
	
	@Column(name="situacao", nullable=false)
	private SituacaoTarefa situacao=SituacaoTarefa.ABERTA;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Date getAbertura() {
		return abertura;
	}
	public void setAbertura(Date abertura) {
		this.abertura = abertura;
	}
	public Date getFechamento() {
		return fechamento;
	}
	public void setFechamento(Date fechamento) {
		this.fechamento = fechamento;
	}
	public SituacaoTarefa getSituacao() {
		return situacao;
	}
	public void setSituacao(SituacaoTarefa situacao) {
		this.situacao = situacao;
	}
	
	
	
	
}

package br.com.msitec.teste.react.ajax;

import org.springframework.data.domain.Sort;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.msitec.teste.react.serializer.SortJsonDeserializer;

public  class Grid<T> {

	private T object;
	private Integer perPage;
	private Integer page;
	private Sort sort;
	public T getObject() {
		return object;
	}
	public void setObject(T object) {
		this.object = object;
	}
	public Integer getPerPage() {
		return perPage;
	}
	public void setPerPage(Integer perPage) {
		this.perPage = perPage;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Sort getSort() {
		return sort;
	}
	@JsonDeserialize(using=SortJsonDeserializer.class)
	public void setSort(Sort sort) {
		this.sort = sort;
	}
	
	
}

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";




				
class TableHeader extends React.Component {
iconHasAsc = <span class="material-icons">keyboard_arrow_down</span>; 
iconHasDesc = <span class="material-icons">keyboard_arrow_up</span>; 
iconHasent = <span class="material-icons">unfold_more</span>; 
constructor(props) {
	super(props);
	 this.handleClick = this.handleClick.bind(this);
	 this.state = {
      icon : this.iconHasent
    };
 }  
 handleClick(e) {
	 e.preventDefault();
    this.props.parent.order(this.props.property);
    let icon = this.iconHasent;
    if(this.props.parent.has(this.props.property,'ASC')){
    	icon = this.iconHasAsc;
    }else if(this.props.parent.has(this.props.property,'DESC')){
   		 icon =	this.iconHasDesc;
    }
	this.setState({icon:icon});
 }
 render() {
   
	let has = this.props.parent.has;
	let prop = this.props.property;
    return (
      <th onClick={this.handleClick}>
		  {this.props.header} 
		  {this.state.icon}
	  </th>
    );
  }
}
class Cell extends React.Component {
 properties={};
 constructor(props) {
	super(props);
 }
  render() {
    return (
      <td>
		  {this.props.value}
	  </td>
    );
  }
}
class TableBody extends Component {
	constructor(props) {
		super(props);
		
	}
	createRows = () =>{
		let row=[];
		if(this.props.rows){
			for(let i=0;i<this.props.rows.length;i++){
				row.push(<tr>
				<Cell value={this.props.rows[i].id} />  
				<Cell value={this.props.rows[i].titulo} />  
				<Cell value={this.props.rows[i].descricao} />  
				<Cell value={this.props.rows[i].abertura} />  
				<Cell value={this.props.rows[i].fechamento} />  
				<Cell value={this.props.rows[i].situacao} />  
				</tr>)				
			}
		}
		return row;
	}
	render() {
		
	    return 	(this.createRows());
	}
}
class App extends Component {
  rows = [];
  constructor(props){
	  super(props);
	  this.grid={
			perPage:20,
			page:0,
			object:{titulo:""},
			sort:{orders:[]}
	  }
	  this.page={}
	  this.state={
			  grid:{
				perPage:20,
				page:0,
				object:{titulo:""},
				sort:{orders:[]}
			  },
			  page:{}
	  } 
	  this.getGrid();
  }
   getGrid (doKeepPage){
		if(!(doKeepPage)){
			this.grid.object.page=0;
		}
		this.grid.object.page=0;
		if(this.grid.object.id<0||this.grid.object.id=="")this.grid.object.id=undefined;
		if(this.grid.object.titulo==="")this.grid.object.titulo=undefined;
		if(this.grid.object.descricao==="")this.grid.object.descricao=undefined;
		if(this.grid.object.abertura==="")this.grid.object.abertura=undefined;
		if(this.grid.object.fechamento=="")this.grid.object.fechamento=undefined;
		if(this.grid.object.situacao=="")this.grid.object.situacao=undefined;
		fetch(new Request("http://localhost:8080/grid",{ method: 'POST',
        headers: {'Content-Type':"application/json"},
        mode: 'cors',
        cache: 'default',
        body:JSON.stringify(this.grid)})).then((response)=>{
        	return response.json();
        }).then((json)=>{
           	this.page = json;
        	console.log(this.page);
        	this.setState({grid:this.grid,page:this.page});
        });
	    
	}
	order=function(property){
		for(let x in this.grid.sort.orders){
			if(this.grid.sort.orders[x].property===property){
				if(this.grid.sort.orders[x].direction==='ASC'){
					this.grid.sort.orders[x].direction='DESC';
					this.getGrid(true);
					return;
				}else{
					this.grid.sort.orders.splice(x,1);
					this.getGrid(true);
					return;
				}
			}
		}
		this.grid.sort.orders.push({property:property,direction:'ASC'});
		this.getGrid(true);
	};

	has=function(property,direction){
		if(this){
			for(let x in this.grid.sort.orders){
				if(this.grid.sort.orders[x].property===property){
					if(direction){
						if(this.grid.sort.orders[x].direction===direction){
							return true;
						}else{
							return false;
						}
					}
					return true;
				}
			}
			return false;
		}
	}

	first=function(){
		this.getGrid();				
	}
	previous=function(){
		if(this.grid.page>0)this.grid.page--;
		this.getGrid(true);		
	}
	next=function(){
		if(this.grid.page<(this.page.totalPages-1))this.grid.page++;
		this.getGrid(true);		
	}
	last=function(){
		this.grid.page=(this.page.totalPages-1);
		this.getGrid(true);		
	}
  
	
  
  render() {
	
    return (
    		<table>
    			<thead>
    				<tr>
    					<th><input type='number' placeholder='ID' /></th>
    					<th><input type='text' placeholder='Titulo'/></th>
    					<th><input type='text' placeholder='Descricao'/></th>
    					<th><input type='text' placeholder='Abertura'/></th>
    					<th><input type='text' placeholder='Fechamento'/></th>
    					<th><input type='text' placeholder='Situacao'/></th>
    				</tr>
    				<tr>
	    				<TableHeader parent={this} property={"id"} header={"ID"} />
						<TableHeader parent={this} property={"titulo"} header={"Titulo"} />
						<TableHeader parent={this} property={"descricao"} header={"Descricao"} />
						<TableHeader parent={this} property={"abertura"} header={"Abertura"} />
						<TableHeader parent={this} property={"fechamento"} header={"Fechamento"} />
						<TableHeader parent={this} property={"situacao"} header={"Situacao"} />		
    				</tr>
    			</thead>
    			<tbody>
    				<TableBody rows={this.state.page.content} />
    			</tbody>
    			<tfoot>
    				<tr>
    					<td colspan="5">
    						<span>
    							<span ng-click="first()" class="material-icons" >first_page</span>
    							<span ng-click="previous()" class="material-icons">chevron_left</span>
    							<span>{this.page.number+1} de {this.page.totalPages}</span>
    							<span ng-click="next()" class="material-icons">chevron_right</span>
    							<span ng-click="last()" class="material-icons">last_page</span>
    						</span>
    						<span>
    							<select ng-model='param.table.resultsPerPage' ng-change="getGrid()">
    								<option ng-value="10">10</option>
    								<option ng-value="15">15</option>
    								<option ng-value="20">20</option>
    								<option ng-value="25">25</option>							
    							</select>
    						</span>
    					</td>
    				</tr>
    			</tfoot>				
    		</table>
    );
  }
}

export default App;

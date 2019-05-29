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
	 this.createHeaders = this.createHeaders.bind(this);
	 this.state = {
      icons : []
    };
	 for(let prop of this.props.parent.properties){
		 this.state.icons[prop.property]=this.iconHasent;
	 }
 }  
 handleClick(property) {
    this.props.parent.order(property);
    let icon = this.iconHasent;
    if(this.props.parent.has(property,'ASC')){
    	icon = this.iconHasAsc;
    }else if(this.props.parent.has(property,'DESC')){
   		 icon =	this.iconHasDesc;
    }
    let state = this.state;
    state.icons[property]=icon;
	this.setState(state);
 }
 createHeaders (){
	 let content =[];
	 let has = this.props.parent.has;
	 for(let prop of this.props.parent.properties){
		 content.push(<th onClick={()=>this.handleClick(prop.property)}>{prop.label}{this.state.icons[prop.property]}</th>);
	 }
	 return content;
 }
 
 render() {
    return (
   		this.createHeaders()
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
	createCells = (entry,keys) =>{
		let content =[];
		for(let key of keys){
			content.push(<Cell value={entry[key]} />);
		}				
		return content;	
	}
	createRows = () =>{
		let rows=[];
		if(this.props.rows){
			for(let entry of this.props.rows){
				let keys = Object.keys(entry);
				rows.push(<tr>{this.createCells(entry,keys)}</tr>);
			}
		}
		return rows;
	}
	render() {
		
	    return 	(this.createRows());
	}
}
class App extends Component {
  rows = [];
  constructor(props){
	  super(props);
	  this.properties = [
		  {property:'id',label:'ID'},
		  {property:'titulo',label:'Titulo'},
		  {property:'descricao',label:'Descricao'},
		  {property:'abertura',label:'Abertura'},
		  {property:'fechamento',label:'Fechamento'},
		  {property:'situacao',label:'Situacao'},
	  ]
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
	  this.first = this.first.bind(this);
	  this.previous = this.previous.bind(this);
	  this.next = this.next.bind(this);
	  this.last = this.last.bind(this);
	  this.getGrid = this.getGrid.bind(this);
	  
	  this.getGrid();
  }
   getGrid (doKeepPage){
		console.log(this.grid)
	   if(!(doKeepPage)){
			this.grid.page=0;
		}
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
	    				<TableHeader parent={this} />
    				</tr>
    			</thead>
    			<tbody>
    				<TableBody rows={this.state.page.content} />
    			</tbody>
    			<tfoot>
    				<tr>
    					<td colspan="5">
    						<span>
    							<span onClick={this.first} class="material-icons" >first_page</span>
    							<span onClick={this.previous} class="material-icons">chevron_left</span>
    							<span>{this.page.number+1} de {this.page.totalPages}</span>
    							<span onClick={this.next} class="material-icons">chevron_right</span>
    							<span onClick={this.last} class="material-icons">last_page</span>
    						</span>
    						<span>
    							<select value={this.grid.perPage} onChange={this.getGrid}>
    								<option value="10">10</option>
    								<option value="15">15</option>
    								<option value="20">20</option>
    								<option value="25">25</option>							
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

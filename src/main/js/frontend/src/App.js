import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";




				
class TableHeader extends React.Component {
 properties={};
 constructor(props) {
	super(props);
 }   
 render() {
    let icon; 
	if(this.props.parent.has('id','ASC')){
		icon = <span class="material-icons">keyboard_arrow_down</span>;
	}else if(this.props.parent.has('id','DESC')){
		icon = <span class="material-icons">keyboard_arrow_up</span>;
	}else{
		icon = <span class="material-icons">unfold_more</span>;
	}
    return (
      <th onClick={this.props.parent.order('id')}>
		  {this.props.header} {icon}
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
	render() {
		let content = <tr>;
		for(row of this.props.rows){
//			for(data of Object.keys(row)){
//				content+= <Cell value={data} />
//			}
	    }
		content+=</tr>;
	    return (
	    		{content}
	    )
	}
}
class App extends Component {
  rows = [];
  page = {}
	  
   grid={
		perPage:20,
		page:0,
		object:{titulo:""},
		sort:{orders:[]}
	}

	order=function(property){
		for(let x in this.grid.sort){
			if(this.grid.sort[x].property===property){
				if(this.grid.sort[x].direction==='ASC'){
					this.grid.sort[x].direction='DESC';
					this.getGrid(true);
					return;
				}else{
					this.grid.sort.splice(x,1);
					this.getGrid(true);
					return;
				}
			}
		}
		this.grid.sort.push({property:property,direction:'ASC'});
		this.getGrid(true);		
	};

	has=function(property,direction){
		for(let x in this.grid.sort){
			if(this.grid.sort[x].property===property){
				if(direction){
					if(this.grid.sort[x].direction===direction){
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
  
  
  
  async componentDidMount() {
	  
    const response = await fetch(new Request("http://localhost:8080/grid",{ method: 'POST',
        headers: {'Content-Type':"application/json"},
        mode: 'cors',
        cache: 'default',
        body:JSON.stringify(this.grid)}));
    
    
    this.page = await response.json();
    
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
	    				<TableHeader parent={this} header={"ID"} />
						<TableHeader parent={this} header={"Titulo"} />
						<TableHeader parent={this} header={"Descricao"} />
						<TableHeader parent={this} header={"Abertura"} />
						<TableHeader parent={this} header={"Fechamento"} />
						<TableHeader parent={this} header={"Situacao"} />		
    				</tr>
    			</thead>
    			<tbody>
    				<TableBody rows={this.grid.content} />
    			</tbody>
    			<tfoot>
    				<tr>
    					<td colspan="5">
    						<span>
    							<span ng-click="first()" class="material-icons" >first_page</span>
    							<span ng-click="previous()" class="material-icons">chevron_left</span>
    							<span>{this.page.page+1} de {this.page.totalPages}</span>
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

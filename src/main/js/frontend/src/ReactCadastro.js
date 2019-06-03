import React, { Component } from "react";


class ReactCadastro extends Component {
  componentDidMount() {
	    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  constructor(props){
	  super(props);
	  this.properties = [
		  {property:'id',label:'ID', type:'hidden'},
		  {property:'titulo',label:'Titulo', type:'text'},
		  {property:'descricao',label:'Descricao', type:'text'},
		  {property:'abertura',label:'Abertura',type:'date'},
		  {property:'fechamento',label:'Fechamento',type:'date'},
		  {property:'situacao',label:'Situacao',type:'select', options:['ABERTA','ANDAMENTO','CONCLUIDA','CANCELADA']},
	  ]
	  this.state={};
	  this.clearState();
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.createInput = this.createInput.bind(this);
	  this.handleChangeInput = this.handleChangeInput.bind(this);
  }
  handleChangeInput(e,property) {
		this.state[property] = e.target.value;
  }
  clearState(){
	  for(let prop of this.properties){
		  this.state[prop.property]=undefined;
	  }
  }

	 handleSubmit(e) {
		 e.preventDefault();
		let method =  (!this.state.id)?'POST':'PUT';
			if(this.state.titulo===""||this.state.titulo===undefined){
				alert("Campo Titulo está em preenchido incorretamente ou vázio!");
				return; 
			}
			if(this.state.descricao===""||this.state.descricao===undefined){
				alert("Campo Descricao está em preenchido incorretamente ou vázio!");
				return; 
			}
			if(this.state.abertura===""||this.state.abertura===undefined){
				alert("Campo Abertura está em preenchido incorretamente ou vázio!");
				return; 
			}
			if(this.state.fechamento===""||this.state.fechamento===undefined){
				alert("Campo Fechamento está em preenchido incorretamente ou vázio!");
				return; 
			}
			if(this.state.situacao===""||this.state.situacao===undefined){
				alert("Campo Situacao está em preenchido incorretamente ou vázio!");
				return; 
			}
			
			fetch(new Request("http://localhost:8080/tarefa",{ method:method ,
	        headers: {'Content-Type':"application/json"},
	        mode: 'cors',
	        cache: 'default',
	        body:JSON.stringify(this.state)})).then((response)=>{
	        	return response.json();
	        }).then((json)=>{
	        	this.clearState();
	        	this.props.parent.getGrid();
	        });
		    
		
	 }
	 createOptions (options){
		 let optionsDom=[];
		 optionsDom.push(<option></option>)
		 for(let opt of options){
			 optionsDom.push(<option value={opt}>{opt}</option>)
		 }
		 return optionsDom;
	 }
	 createInput(prop){
		 if(prop.type==='select'){
			 return <select id={prop.property} onChange={(e)=>this.handleChangeInput(e,prop.property)}  required>{this.createOptions(prop.options)}</select>;	
		 }else{
			 return <input id={prop.property} type={prop.type} onChange={(e)=>this.handleChangeInput(e,prop.property)}  required/>;		
		 }
	 }
	 
	 createInputs (){
		 let content =[];
		 for(let prop of this.properties){
			 if(prop)
			 content.push(<div>
			 				{this.createInput(prop)}
			 				<label for={prop.property}>{prop.label}</label>
			 			  </div> 	
			 );
		 }
		 return content;
	 }
  
  render() {
	
    return (
    		<form onSubmit={this.handleSubmit}>
    			{this.createInputs()}
    			<button>Enviar</button>
    		</form>
    );
  }
}
export default ReactCadastro;
import React, { Component } from "react";
import ReactTable from "./ReactTable.js";
import ReactCadastro from "./ReactCadastro.js";
import "./App.css";

class App extends Component {
	render() {
	    return (<React.Fragment>
	    		<ReactTable parent={this} onRef={ref => (this.table = ref)} />
	    		<ReactCadastro parent={this} onRef={ref => (this.cadastro = ref)} />
	    		</React.Fragment>)
	}
	
}
export default App;

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    message: ""
  };
  
  let headers=new Headers();
  headers.append("Content-Type", "application/json");
  let config={ method: 'post',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      body:{perPage:20,page:0,object:{}sort:{}}}

  async componentDidMount() {
    const response = await fetch(new Request("http://localhost:8080/grid",config));
    const message = await response.text();
    this.setState({ message });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.message}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

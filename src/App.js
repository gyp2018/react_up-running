import React, { Component } from 'react';
import Excel from './components/Excel';
import { headers, data } from './data';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <h2>Excel Table</h2>
          <Excel headers={headers} data={data} />
        </div>
      </div>
    );
  }
}

export default App;

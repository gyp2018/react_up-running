import React, { Component } from 'react';
import './App.css';
import { headers, data } from './data';
import PlainExcel from './components/plain/Excel';
import SortExcel from './components/sort/Excel';
import EditExcel from './components/edit/Excel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <PlainExcel headers={headers} data={data} />
          <SortExcel headers={headers} data={data} />
          <EditExcel headers={headers} data={data} />
        </div>
      </div>
    );
  }
}

export default App;

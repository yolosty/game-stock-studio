import React, { Component } from 'react';
import logo from './folder.svg';
import './App.css';

import StockBox from './components/stock-box';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Game Stock Studio</h2>
        </div>
        <StockBox />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import GameFilter from './game-filter';

class StockBox extends Component {
  render() {
    return (
      <div className="stock-box">
        This is a game-stock-box.
        <GameFilter/>
      </div>
    );
  }
}

export default StockBox;

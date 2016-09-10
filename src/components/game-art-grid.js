import React, { Component } from 'react';

class GameArtGrid extends Component {
  render() {
    return (
      <div className="game-art-grid">
        {(this.props.images || []).map((image,i) => {
          return (
                  <img key={image} src={image+'&h=120'} />
                 );
        })}
      </div>
    );
  }
}

export default GameArtGrid;

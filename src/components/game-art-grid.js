import React, { Component } from 'react';

class GameArtGrid extends Component {
  selectArt(event) {
    this.props.action(event.target.src);
  }

  render() {
    let game = this.props.game || {};
    return (
      <div className="game-art-grid">
        {(game.images || []).map((image,i) => {
          return (
                  <img key={image} onClick={ this.selectArt.bind(this) } alt={`${game.id}-achievement-${i}`} src={image+'&h=120'} />
                 );
        })}
      </div>
    );
  }
}

export default GameArtGrid;

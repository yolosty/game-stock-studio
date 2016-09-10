import React, { Component } from 'react';

import GameArtGrid from './game-art-grid';

let destiny_images = require('../destiny_images.json');
let rocket_league_images = require('../rocket_league_images.json');

class GameFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImages: props.images,
      games: [
        { name: 'Destiny', id: 'destiny', images: destiny_images },
        { name: 'Rocket League', id: 'rocket-league', images: rocket_league_images }
      ]
    };
  }

  handleChange(event) {
    this.setState({
      selectedImages: this.state.games.find((x) => {
        return x.id === event.target.value;
      } ).images
    });
  }

  render() {
    return (
      <div className="game-filter">
        <div className='filter-label'>
          Game
        </div>
        <select className='filter' name='game' id='game' defaultValue='' onChange={this.handleChange.bind(this)}>
          <option value='select' key='0'>Select</option>
          {(this.state.games || []).map((d) => {
            return (
                    <option key={d.id} value={d.id}>{d.name}</option>
                   );
          })}
        </select>
        <GameArtGrid images={this.state.selectedImages}/>
      </div>
    );
  }
}

export default GameFilter;

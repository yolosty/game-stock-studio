import React, { Component } from 'react';

import GameArtGrid from './game-art-grid';
import Modal from 'react-modal';

let destiny_images = require('../destiny_images.json');
let rocket_league_images = require('../rocket_league_images.json');

class GameFilter extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectArt = this.selectArt.bind(this);
    this.paintCanvas = this.paintCanvas.bind(this);
    this.state = {
      selectedArt: undefined,
      open: false,
      selectedGame: {},
      games: [
        { name: 'Destiny', id: 'destiny', images: destiny_images },
        { name: 'Rocket League', id: 'rocket-league', images: rocket_league_images }
      ]
    };
  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  handleChange(event) {
    this.setState({
      selectedGame: this.state.games.find((x) => {
        return x.id === event.target.value;
      } )
    });
  }

  paintCanvas() {
    let context = document.getElementById('art-canvas').getContext("2d");
    let artImg = new Image();

    artImg.src = this.state.selectedArt + '&h=720';
    context.canvas.width = 1280;
    context.canvas.height = 720;
    artImg.onload = function () {
        context.drawImage(artImg, 0, 0, 1280, 720);
    }
  }

  downloadStock(event) {
    let targetDevice = event.target.id;

    if (targetDevice === 'iphone-dl') {
    } else if (targetDevice === 'android-dl') {
    }
  }

  selectArt(img) {
    this.setState({
      selectedArt: img.substring(0,img.length - 6)
    });
    this.openModal();
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
        <GameArtGrid game={this.state.selectedGame} action={this.selectArt} />
        <Modal isOpen={this.state.open} onAfterOpen={this.paintCanvas}>
          <h1>Achievement art</h1>
          <canvas id='art-canvas' />
          <div>
            <button id='iphone-dl' onClick={this.downloadStock.bind(this)}>iPhone</button>
            <button id='android-dl' onClick={this.downloadStock.bind(this)}>Android</button>
            <button onClick={this.closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default GameFilter;

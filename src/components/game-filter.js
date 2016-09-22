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
    let canvasArt = document.getElementById('art-canvas');

    let canvasStock = document.getElementById('stock-canvas');
    let contextStock = canvasStock.getContext("2d");
    canvasStock.width = 200;
    canvasStock.height = 350;

    if (targetDevice === 'iphone-dl') {
      // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      contextStock.drawImage(canvasArt, 200, 0, 400, 700, 0, 0, 200, 350);
    } else if (targetDevice === 'android-dl') {
      this._renderSelection();
    }
  }

  selectArt(img) {
    this.setState({
      selectedArt: img.substring(0,img.length - 6)
    });
    this.openModal();
  }

  _renderSelection() {
    // scavaged from https://github.com/MattKetmo/darkroomjs/blob/master/lib/js/plugins/darkroom.crop.js#L59
    let ctx = document.getElementById('art-canvas').getContext("2d");

    // Overlay rendering
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this._renderOverlay(ctx);
  }

  _renderOverlay(ctx) {
    //
    //    x0    x1        x2      x3
    // y0 +------------------------+
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    // y1 +------+---------+-------+
    //    |\\\\\\|         |\\\\\\\|
    //    |\\\\\\|    0    |\\\\\\\|
    //    |\\\\\\|         |\\\\\\\|
    // y2 +------+---------+-------+
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    // y3 +------------------------+
    //

    let x0 = 0;
    let x1 = 200;
    let x2 = 600;
    let x3 = 1280;

    let y0 = 0;
    let y1 = 0;
    let y2 = 700;
    let y3 = 720;

    ctx.beginPath();

    // Draw outer rectangle.
    // Numbers are +/-1 so that overlay edges don't get blurry.
    ctx.moveTo(x0 - 1, y0 - 1);
    ctx.lineTo(x3 + 1, y0 - 1);
    ctx.lineTo(x3 + 1, y3 + 1);
    ctx.lineTo(x0 - 1, y3 - 1);
    ctx.lineTo(x0 - 1, y0 - 1);
    ctx.closePath();

    // Draw inner rectangle.
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x1, y1);

    ctx.closePath();
    ctx.fill();
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
          <canvas id='stock-canvas' />
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

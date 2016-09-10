import React, { Component } from 'react';

class GameFilter extends Component {
  render() {
    let games = [ 
      { name: 'Destiny', id: 'destiny' },
      { name: 'Rocket League', id: 'rocket-league' }
    ];

    return (
      <div className="game-filter">
        <div className='filter-label'>
          Game
        </div>
        <select className='filter' name='game' id='game' defaultValue=''>
          <option value='select' key='0'>Select</option>
          {(games || []).map((d) => {
            return ( 
                    <option key={d.id} value={d.id}>{d.name}</option> 
                   );
          })}
        </select>
      </div>
    );
  }
}

export default GameFilter;

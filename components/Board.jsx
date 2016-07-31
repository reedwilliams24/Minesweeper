var React = require('react');
var Tile = require('./Tile');

var Board = React.createClass({
  render: function() {
    return (
      <div id='board'>
        {this.renderRows()}
      </div>
    );
  },

  renderRows: function() {
    var board = this.props.board;
    return board.grid.map(function(row, i){
      return (
        <div className='row' key={'row_' + i.toString()}>
          {this.renderTiles(row, i)}
        </div>
      );
    }.bind(this));
  },

  renderTiles: function(row, i) {
    var board = this.props.board;
    return row.map(function(tile, j){
      return (
        <Tile
          tile={tile}
          key={i * board.gridSize + j}
          updateGame={this.props.updateGame}
          board={board}
          altPressed={this.props.altKey}/>
      );
    }.bind(this));
  }

});

module.exports = Board;

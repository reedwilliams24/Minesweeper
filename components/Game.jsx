var React = require('react');
var Board = require('./Board');
var Minesweeper = require('../minesweeper');

var Game = React.createClass({
  getInitialState: function() {
    var board = new Minesweeper.Board(10, 10);
    return { board: board };
  },

  updateGame: function(tile, flagged) {
    if (flagged){
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board});
  },

  render: function() {
    var gameOver = this.state.board.gameOver();
    var gameText = '';
    if (gameOver){
      if (this.state.board.won()) {
        gameText = 'Winner!';
      } else {
        gameText = 'Game Over';
      }
    }

    return (
      <div>
        <div id='scoreboard'>
          <div id='flagCount'>
            {this.state.board.numBombs - this.state.board.flagCount}
          </div>
          <div>
            {gameText}
          </div>
        </div>
        <Board board={this.state.board} updateGame={this.updateGame}/>
      </div>
    );
  }

});

module.exports = Game;

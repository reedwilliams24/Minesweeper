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
    return (
      <Board board={this.state.board} updateGame={this.updateGame}/>
    );
  }

});

module.exports = Game;

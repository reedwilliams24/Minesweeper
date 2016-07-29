var React = require('react');
var Board = require('./Board');
var Minesweeper = require('../minesweeper');

var Game = React.createClass({
  getInitialState: function() {
    var board = new Minesweeper.Board(10, 10);
    return {
      board: board,
      secondsElapsed: 0
    };
  },

  updateGame: function(tile, flagged) {
    if (flagged){
      tile.toggleFlag();
      if (this.state.board.numBombs - this.state.board.flagCount < 0) {
        tile.toggleFlag();
      }
    } else {
      tile.explore();
    }

    if (this.state.intervalId === undefined) this.startTimer();

    this.setState({ board: this.state.board});
  },

  restartGame: function() {
    var board = new Minesweeper.Board(10, 10);
    this.stopTimer();

    this.setState({
      board: board,
      secondsElapsed: 0,
      intervalId: undefined
    });
  },

  startTimer: function(){
    var id = window.setInterval(function(){
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }.bind(this), 1000);

    this.setState({intervalId: id});
  },

  stopTimer: function() {
    window.clearInterval(this.state.intervalId);
  },

  render: function() {
    var gameStatus;
    if (this.state.board.gameOver()){
      this.stopTimer();

      var gameText;
      if (this.state.board.won()) {
        gameText = 'Winner!';
      } else {
        gameText = 'Game Over';
      }

      gameStatus = (
        <div id='status'>
          <div>{gameText}</div>
          <button
            id='restart-button'
            onClick={this.restartGame}>Restart</button>
        </div>
      );

    }

    return (
      <div id='game'>
        <div id='info'>
          <div id='flag-count'>
            {this.state.board.numBombs - this.state.board.flagCount}
          </div>
          <div id='timer'>
            {this.printTime()}
          </div>
        </div>
        <Board board={this.state.board} updateGame={this.updateGame}/>
        {gameStatus}
      </div>
    );
  },

  printTime: function(){
    var seconds = this.state.secondsElapsed;
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    var secondsString = seconds.toString();
    if (seconds < 10) secondsString = '0' + secondsString;

    var minutesString = minutes.toString();
    if (minutes < 10) minutesString = '0' + minutesString;

    return minutesString + ':' + secondsString;
  }

});

module.exports = Game;

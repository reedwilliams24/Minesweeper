var React = require('react');
var Board = require('./Board');
var Minesweeper = require('../minesweeper');

var Game = React.createClass({
  getInitialState: function() {
    var board = new Minesweeper.Board(10, 10);
    return {
      board: board,
      secondsElapsed: 0,
      altPressed: false
    };
  },

  componentDidMount: function() {
    window.onkeydown = function(e){
      if (e.altKey) this.setState({altPressed: true});
    }.bind(this);

    window.onkeyup = function(e){
      if (this.state.altPressed) this.setState({altPressed: false});
    }.bind(this);
  },

  updateGame: function(tile, flagged) {
    if (tile.explored) return tile;

    var board = this.state.board;

    if (flagged){
      tile.toggleFlag();

      if (tile.flagged){
        board.increaseFlagCount();
      } else {
        board.decreaseFlagCount();
      }

      // not enough flags
      if (this.state.board.numMines - this.state.board.flagCount < 0) {
        tile.toggleFlag();
        board.decreaseFlagCount();
      }

    } else {
      this.state.board.explore(tile);
    }

    if (this.state.intervalId === undefined) this.startTimer();
    if (board.gameOver()) this.stopTimer();

    this.setState({ board: board});
  },

  restartGame: function() {
    var board = new Minesweeper.Board(10, 10);

    this.setState({
      board: board,
      secondsElapsed: 0,
      intervalId: undefined
    });
  },

  startTimer: function(){
    // start timer if a mine was not tripped
    if (!this.state.board.gameOver()){
      var id = window.setInterval(function(){
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        });
      }.bind(this), 1000);
      this.setState({intervalId: id});
    }
  },

  stopTimer: function() {
    window.clearInterval(this.state.intervalId);
  },

  render: function() {
    var gameStatus;
    var modal;

    if (this.state.board.gameOver()){
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

      modal = (
        <div id='modal-screen'>
        </div>
      );
    }

    return (
      <div id='game'>
        <div id='info'>
          <div id='flag-count'>
            {this.state.board.numMines - this.state.board.flagCount}
          </div>
          <div id='timer'>
            {this.printTime()}
          </div>
        </div>
        <Board
          board={this.state.board}
          updateGame={this.updateGame}
          altPressed={this.state.altPressed}/>
        {gameStatus}
        {modal}
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

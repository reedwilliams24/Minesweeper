var React = require('react');

var Tile = React.createClass({
  render: function() {
    return (
      <div
        className={'tile ' + this.classNames()}
        onClick={this.handleClick}>
        {this.value()}
      </div>
    );
  },

  handleClick: function(e){
    var flagClick = e.altKey ? true : false;
    if (this.explored) return;
    this.props.updateGame(this.props.tile, flagClick);
  },

  classNames: function(){
    var tile = this.props.tile;

    var flagging = this.props.altPressed;
    if (flagging){
      flagging = 'flagging ';
    } else {
      flagging = '';
    }

    if (tile.flagged){
      return flagging + 'flag';
    } else if (!tile.explored){
      return flagging;
    } else if (tile.mine){
      return flagging + 'mine';
    } else {
      return flagging + 'explored';
    }
  },

  value: function(){
    var tile = this.props.tile;

    if (tile.flagged){
      return <img src='./docs/flag.png'></img>;
    } else if (!tile.explored){
      return '';
    } else if (tile.mine){
      return <img src='./docs/mine.png'></img>;
    } else {
      var mineCount = this.props.board.adjacentMineCount(tile);
      if (mineCount !== 0) return mineCount;
      return '';
    }
  }

});

module.exports = Tile;

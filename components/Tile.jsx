var React = require('react');

var Tile = React.createClass({

  render: function() {
    var classNames = 'tile ' + this.tileStatus();

    return (
      <div className={classNames} onClick={this.handleClick}>
        {this.printTile()}
      </div>
    );
  },

  handleClick: function(e){
    var flagClick = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagClick);
  },

  tileStatus: function(){
    var tile = this.props.tile;
    if (tile.flagged && !tile.explored) return 'flag';
    if (!tile.explored) return '';

    if (tile.mine === true){
      return 'mine';
    } else if (tile.flagged === true){
      return 'flag';
    } else {
      return 'explored';
    }
  },

  printTile: function(){
    var tile = this.props.tile;

    if (tile.flagged) return 'F';
    if (!tile.explored) return '';

    if (tile.mine){
      return 'X';
    }
    else {
      // var mineCount = tile.adjacentMineCount();
      var mineCount = this.props.board.adjacentMineCount(tile);
      if (mineCount !== 0){
        return mineCount;
      }
    }
  }

});

module.exports = Tile;

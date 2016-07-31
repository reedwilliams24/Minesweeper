var React = require('react');

var Tile = React.createClass({
  render: function() {
    return (
      <div className={'tile ' + this.classNames()} onClick={this.handleClick}>
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

    if (tile.flagged){
      return 'flag';
    } else if (!tile.explored){
      return '';
    } else if (tile.mine){
      return 'mine';
    } else {
      return 'explored';
    }
  },

  value: function(){
    var tile = this.props.tile;

    if (tile.flagged){
      return 'F';
    } else if (!tile.explored){
      return '';
    } else if (tile.mine){
      return 'X';
    } else {
      var mineCount = this.props.board.adjacentMineCount(tile);
      if (mineCount !== 0) return mineCount;
      return '';
    }
  }

});

module.exports = Tile;

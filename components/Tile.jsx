var React = require('react');

var Tile = React.createClass({

  render: function() {
    return (
      <div className='tile' onClick={this.handleClick}>
        {this.printTile()}
      </div>
    );
  },

  handleClick: function(e){
    var flagClick = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagClick);
  },

  printTile: function(){
    var tile = this.props.tile;
    if (tile.flagged && !tile.explored) return 'F';
    if (!tile.explored) return '';

    if (tile.bombed === true){
      return 'B';
    } else if (tile.flagged === true){
      return 'F';
    } else {
      return 'E';
    }
  }

});

module.exports = Tile;

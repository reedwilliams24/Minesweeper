function Tile (board, pos) {
  this.board = board;
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
}

Tile.prototype.plantBomb = function () {
  this.bombed = true;
};

Tile.prototype.toggleFlag = function () {
  if (this.flagged){
    this.flagged = false;
  } else {
    this.flagged = true;
  }
};

Tile.prototype.explore = function () {
  if (this.flagged || this.explored){
    return this;
  }

  this.explored = true;

  // add more here TODO
};



function Board (gridSize, numBombs) {
  this.gridSize = gridSize;
  this.numBombs = numBombs;
  this.grid = [];
  this.generateBoard();
  this.plantBombs();
}

Board.prototype.generateBoard = function () {
  for (var row = 0; row < this.gridSize; row++){
    this.grid.push([]);
    for (var col = 0; col < this.gridSize; col++){
      var tile = new Tile(this, [row, col]);
      this.grid[row].push(tile);
    }
  }
};

Board.prototype.plantBombs = function() {
  var bombCount = 0;
  while (bombCount < this.numBombs){
    var row = Math.floor(Math.random() * this.gridSize);
    var col = Math.floor(Math.random() * this.gridSize);
    var tile = this.grid[row][col];

    if (!tile.bombed){
      tile.plantBomb();
      bombCount+=1;
    }
  }
};

module.exports = {
  Tile,
  Board
};

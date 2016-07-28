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
    this.board.decreaseFlagCount();
  } else {
    this.flagged = true;
    this.board.increaseFlagCount();
  }
};

Tile.prototype.explore = function () {
  if (this.flagged || this.explored){
    return this;
  }

  this.explored = true;

  if (this.adjacentBombCount() === 0){
    this.neighboringPositions().forEach(function(pos){
      this.board.grid[pos[0]][pos[1]].explore();
    }.bind(this));
  }
};

Tile.DELTAS = [
  [1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]
]

Tile.prototype.adjacentBombCount = function(){
  var count = 0;

  this.neighboringPositions().forEach(function(pos){
    if (this.board.grid[pos[0]][pos[1]].bombed) count+=1;
  }.bind(this));

  return count;
};

Tile.prototype.neighboringPositions = function(){
  var neighbors = [];

  Tile.DELTAS.forEach(function(delta){
    var newPos = [this.pos[0] + delta[0], this.pos[1] + delta[1]];
    if (this.board.inBounds(newPos)){
      neighbors.push(newPos);
    }
  }.bind(this));

  return neighbors;
};

function Board (gridSize, numBombs) {
  this.gridSize = gridSize;
  this.numBombs = numBombs;
  this.grid = [];
  this.flagCount = 0;
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

Board.prototype.inBounds = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.gridSize &&
    pos[1] >= 0 && pos[1] < this.gridSize
  );
};

Board.prototype.gameOver = function () {
  var won = true;
  var lost = false;

  this.grid.forEach(function(row){
    row.forEach(function(tile){
      if (tile.bombed && tile.explored) lost = true;
      if ((tile.bombed && !tile.flagged) || (!tile.bombed && !tile.explored)){
        won = false;
      }
    })
  });

  return (won || lost);
};

Board.prototype.won = function () {
  var won = true;

  this.grid.forEach(function(row){
    row.forEach(function(tile){
      if ((tile.bombed && !tile.flagged) || (!tile.bombed && !tile.explored)){
        won = false;
      }
    })
  });

  return won;
};

Board.prototype.increaseFlagCount = function() {
  this.flagCount += 1;
}

Board.prototype.decreaseFlagCount = function() {
  this.flagCount -= 1;
}



module.exports = {
  Tile,
  Board
};

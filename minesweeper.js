function Tile (pos) {
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
}

Tile.prototype.toggleBomb = function () {
  if (this.bombed) {
    this.bombed = false;
  } else {
    this.bombed = true;
  }
};

Tile.prototype.toggleFlag = function () {
  if (this.explored) return this;

  if (this.flagged){
    this.flagged = false;
  } else {
    this.flagged = true;
  }
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
      var tile = new Tile([row, col]);
      this.grid[row].push(tile);
    }
  }
};

Board.prototype.plantBombs = function() {

  // plant bombs in a row
  var bombCount = 0;

  for (var row = 0; row < this.gridSize; row++){
    for (var col = 0; col < this.gridSize; col++){
      this.grid[col][row].toggleBomb();
      bombCount += 1;
      if (bombCount === this.numBombs) break;
    }
    if (bombCount === this.numBombs) break;
  }

  // shuffle bomb placement
  var positions = [];
  for (row = 0; row < this.gridSize; row++){
    for (col = 0; col < this.gridSize; col++){
      if (row !== 0 || col > 1){
        var randomPosition = positions[Math.floor(Math.random() * positions.length)];
        var currentTile = this.grid[col][row];
        var otherTile = this.grid[randomPosition[0]][randomPosition[1]];

        if ((currentTile.bombed && !otherTile.bombed) || (!currentTile.bombed && otherTile.bombed)){
          currentTile.toggleBomb();
          otherTile.toggleBomb();
        }
      }
      positions.push([col, row]);
    }
  }
};

// TODO return early if lost or won
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

// TODO return early if won
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

Board.prototype.adjacentBombCount = function (tile) {
  var count = 0;

  this.neighboringPositions(tile).forEach(function(pos){
    if (this.grid[pos[0]][pos[1]].bombed) count+=1;
  }.bind(this));

  return count;
};

Board.prototype.neighboringPositions = function (tile) {
  var neighbors = [];

  Board.DELTAS.forEach(function(delta){
    var newPos = [tile.pos[0] + delta[0], tile.pos[1] + delta[1]];
    if (this.inBounds(newPos)){
      neighbors.push(newPos);
    }
  }.bind(this));

  return neighbors;
};

Board.prototype.inBounds = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.gridSize &&
    pos[1] >= 0 && pos[1] < this.gridSize
  );
};

Board.prototype.explore = function (tile) {
  if (tile.flagged || tile.explored) return tile;

  tile.explored = true;

  if (this.adjacentBombCount(tile) === 0 && !tile.bombed){
    this.neighboringPositions(tile).forEach(function(pos){
      this.explore(this.grid[pos[0]][pos[1]]);
    }.bind(this));
  }
};

Board.DELTAS = [
  [1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]
];

module.exports = {
  Tile,
  Board
};

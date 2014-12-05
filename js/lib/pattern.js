define(function() {
  function Pattern(world) {
    this.world = world;
  }

  Pattern.prototype.getRandomStartPosition = function(rowOffset, columnOffset) {
    return {
      row: Math.floor(Math.random() * (this.world.rows - rowOffset)),
      column: Math.floor(Math.random() * (this.world.columns - columnOffset))
    }
  }

  Pattern.prototype.generate = function(cells, row, column) {
    var world = this.world;
    cells.map(function(cellCoordinate) {
      var cell = world.getCellAt(row + cellCoordinate[0], column + cellCoordinate[1]);
      cell.revive();
      world.markLiveCells(cell);
    });
  };

  Pattern.prototype.acorn = function() {
    var randomStartPosition = this.getRandomStartPosition(3,7);
    var cellsPattern = [
      [2,0], [0,1], [2,1], [1,3], [2,4], [2,5], [2,6]
    ]

    this.generate(cellsPattern, randomStartPosition.row, randomStartPosition.column);
  };

  Pattern.prototype.translate = function(cells, rowDifference, columnDifference) {
    return cells.map(function(cell) {
      return [(cell[0] + rowDifference), (cell[1] + columnDifference)]
    });
  }

  Pattern.prototype.blinker = function() {
    var randomStartPosition = this.getRandomStartPosition(2,2);
    var cellsPattern = [
      [0,0], [0,1], [0,2]
    ]

    this.generate(cellsPattern, randomStartPosition.row, randomStartPosition.column);
  };

  Pattern.prototype.gliderGun = function() {
    var randomStartPosition = this.getRandomStartPosition(8,35);
    var cellsPattern = [
      [0,0],[0,1],[1,0],[1,1],[0,10],[1,10],[2,10],[3,11],[4,12],[4,13],
      [-1,11],[-2,12],[-2,13],[1,14],[-1,15],[0,16],[1,16],[2,16],[1,17],[3,15],
      [0,20],[-1,20],[-2,20],[0,21],[-1,21],[-2,21],[-3,22],[1,22],[-3,24],[1,24],
      [-4,24],[2,24],[-2,35],[-2,34],[-1,35],[-1,34]
    ]

    cellsPattern = this.translate(cellsPattern, 4, 0);
    this.generate(cellsPattern, randomStartPosition.row, randomStartPosition.column);
  };

  return {
    initialize: function(world) {
      return new Pattern(world);
    }
  }
});

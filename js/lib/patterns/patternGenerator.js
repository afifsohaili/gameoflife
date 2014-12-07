define(function () {
  function PatternGenerator() {
  }

  PatternGenerator.prototype.attach = function(world) {
    this.world = world;
  };

  PatternGenerator.prototype.getRandomStartPosition = function(rowOffset, columnOffset) {
    return {
      row: Math.floor(Math.random() * (this.world.rows - rowOffset)),
      column: Math.floor(Math.random() * (this.world.columns - columnOffset))
    }
  }

  PatternGenerator.prototype.generate = function(cells, row, column) {
    var world = this.world;
    cells.forEach(function(cellCoordinate, index, array) {
      var cell = world.getCellAt(row + cellCoordinate[0], column + cellCoordinate[1]);
      cell.revive();
      world.markLiveCells(cell);
    });
  };

  var patternGenerator = new PatternGenerator();

  return patternGenerator;
});

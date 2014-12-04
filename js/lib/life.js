define(["world"], function(world) {
  var Life = function() {
    this.world = null;
  }

  Life.prototype.attachWorld = function(world) {
    this.world = world;
  };

  Life.prototype.start = function(interval) {
    var self = this;
    setInterval(function() {
      self.nextGeneration = world.draw(self.world.options);
      self.reproduce();
    }, interval);
    // this.nextGeneration = world.draw(this.world.options);
    // this.reproduce();
  };

  Life.prototype.reproduce = function() {
    for (var row = 0; row < this.world.rows; row++) {
      for (var column = 0; column < this.world.columns; column++) {
        var currentCell = this.nextGeneration.getCellAt(row, column);
        var livingNeighborsCount = this.world.getLivingNeighborsForCellAt(row, column).length;
        if (livingNeighborsCount == 3) {
          currentCell.revive();
        }
        else if (livingNeighborsCount == 2 && this.world.getCellAt(row, column).isAlive) {
          currentCell.revive();
        }
        else {
          currentCell.die();
        }
      }
    }
    this.world = this.nextGeneration;
    this.world.redraw();
  };

  return new Life();
});

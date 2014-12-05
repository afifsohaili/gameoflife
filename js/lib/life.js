define(["world"], function(world) {
  var Life = function() {
    this.world = null;
  }

  Life.prototype.attachWorld = function(world) {
    this.world = world;
  };

  Life.prototype.start = function(interval) {
    var self = this;

    return setInterval(function() {
              self.nextGeneration = world.map(self.world.options);
              self.reproduce();
            }, interval);
  };

  Life.prototype.getCellsWithPotentialToLive = function() {
    var cells = new Array()
    var cellsCounter = {};
    var world = this.world;
    this.world.liveCells.map(function(cell) {
      var cellNeighbors = cell.getNeighbors(world.rows, world.columns);
      cellNeighbors.map(function(neighborPosition) {
        neighbor = world.getCellAt(neighborPosition[0], neighborPosition[1]);
        if (!cellsCounter.hasOwnProperty(neighbor.row+","+neighbor.column)) {
          cells.push(neighbor);
          cellsCounter[neighbor.row+","+neighbor.column] = 1;
        }
      });
    });
    return cells.concat(this.world.liveCells);
  };

  Life.prototype.reproduce = function() {
    console.log("Reproducing...");
    if (this.world.hasLiveCells()) {
      var potentialCells = this.getCellsWithPotentialToLive();
      this.produceNextGeneration(potentialCells);
    }
    this.world = this.nextGeneration;
    this.world.redraw();
  };

  Life.prototype.produceNextGeneration = function(potentialCells) {
    var world = this.world;
    var nextGeneration = this.nextGeneration;
    potentialCells.map(function(cell) {
      var cellChild = nextGeneration.getCellAt(cell.row, cell.column);
      var livingNeighborsCount = world.getLivingNeighborsForCellAt(cell.row, cell.column).length;
      if (livingNeighborsCount == 3 || (livingNeighborsCount == 2 && cell.isAlive)) {
        cellChild.revive();
        nextGeneration.markLiveCells(cellChild);
      }
      else {
        cellChild.die();
      }
    });
  };

  return {
    run: function(world) {
      life = new Life();
      life.attachWorld(world);
      return life;
    }
  }
});

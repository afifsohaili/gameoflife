define(["world"], function(world) {
  var Life = function() {
    this.world = null;
  }

  Life.prototype.attachWorld = function(world) {
    this.world = world;
  };

  Life.prototype.start = function(interval) {
    var self = this;
    return setInterval(
      function() {
        self.reproduce();
      }
    , interval);
  };

  Life.prototype.getCellsWithPotentialToLive = function() {
    var cells = new Array()
    var cellsCounter = {};
    var world = this.world;
    Object.keys(this.world.liveCells).forEach(function(id) {
      cell = world.getCellById(id);
      var cellNeighbors = cell.getNeighbors(world.rows, world.columns).map(function(cellCoordinates) {
        return world.getCellAt(cellCoordinates[0], cellCoordinates[1]);
      });
      cells.push(cell);
      cellsCounter[cell.getId()] = 1;
      cellNeighbors.map(function(neighbor) {
        if (!cellsCounter.hasOwnProperty(neighbor.row+","+neighbor.column)) {
          cells.push(neighbor);
          cellsCounter[neighbor.getId()] = 1;
        }
      });
    });
    return cells;
  };

  Life.prototype.reproduce = function() {
    console.log("Populating next generation...");
    if (this.world.hasLiveCells()) {
      var potentialCells = this.getCellsWithPotentialToLive();
      this.produceNextGeneration(potentialCells);
    }
    this.world.redraw();
  };

  Life.prototype.produceNextGeneration = function(potentialCells) {
    var world = this.world;
    var cells = {
      live: new Array(),
      approachingDeath: new Array()
    }

    potentialCells.forEach(function(cell) {
      var livingNeighborsCount = world.getLivingNeighborsForCellAt(cell.row, cell.column).length;
      if (cell.isAlive) {
        if (livingNeighborsCount == 2 || livingNeighborsCount == 3) {
          cells.live.push(cell);
        }
        else {
          cells.approachingDeath.push(cell);
        }
      }
      else {
        if (livingNeighborsCount == 3) {
          cells.live.push(cell);
        }
      }
    });

    this.killAll(cells.approachingDeath);
    this.giveBirthTo(cells.live);
  };

  Life.prototype.killAll = function (markedCells) {
    var world = this.world;
    markedCells.forEach(function(cell) {
      cell.die();
      world.markDeadCells(cell);
    });
  };

  Life.prototype.giveBirthTo = function (markedCells) {
    var world = this.world;
    markedCells.forEach(function(cell) {
      cell.revive();
      world.markLiveCells(cell);
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

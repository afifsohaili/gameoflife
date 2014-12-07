define(["cell"], function(cell) {
  function World() {
  }

  World.prototype.initialize = function(options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.worldElement = options.world;
    this.cellTemplate = options.cellTemplate;
    this.init();
  }

  World.prototype.init = function() {
    var worldElement = $(this.worldElement);
    worldElement.html("");
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      var rowContent = "<tr>"
      for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
        rowContent += this.cellTemplate;
      }
      worldElement.append(rowContent + "</tr>");
    }
    this.associateCells();
  };

  World.prototype.associateCells = function() {
    this.cells = {};
    var self = this;
    $(self.worldElement + " td").each(function(index) {
      var row = parseInt(index / self.columns);
      var column = index % self.columns;
      var newCell = cell.spawn(this, row, column);
      self.cells[newCell.getId()] = newCell;
    });
  };

  World.prototype.hasLiveCells = function() {
    return this.liveCells ? (Object.keys(this.liveCells).length > 0 ? true : false) : false;
  };

  World.prototype.markLiveCells = function(cell) {
    if (typeof this.liveCells === 'undefined') {
      this.liveCells = {}
    }
    if (!this.liveCells.hasOwnProperty(cell.getId())) {
      this.liveCells[cell.getId()] = cell;
      cell.redraw();
    }
  };

  World.prototype.markDeadCells = function(cell) {
    delete this.liveCells[cell.getId()];
    cell.redraw();
  };

  World.prototype.getCellAt = function (row, column) {
    return this.getCellById("cell" + row + "_" + column);
  };

  World.prototype.getCellById = function (id) {
    return this.cells[id];
  };

  World.prototype.getLivingNeighborsForCellAt = function(row, column) {
    var currentCell = this.getCellAt(row, column);
    var neighbors = currentCell.getNeighbors(this.rows, this.columns);
    var livingNeighbors = [];
    for (var i = 0; i < neighbors.length; i++) {
      neighborCell = this.getCellAt(neighbors[i][0], neighbors[i][1]);
      if (neighborCell.isAlive) {
        livingNeighbors.push(neighborCell);
      }
    }
    return livingNeighbors;
  };

  var world = new World();
  return {
    map: function(options) {
      world.initialize(options);
      return world;
    }
  }
});

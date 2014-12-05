define(["cell"], function(cell) {
  var World = function(options) {
    // constructor operations
    this.cells = [];
    this.rows = options.rows;
    this.columns = options.columns;
    this.worldElement = options.world;
    this.cellTemplate = options.cellTemplate;
    this.options = options;
    this.init();
    this.associateCells();
  }

  World.prototype.associateCells = function() {
    for (var row = 0; row < this.rows; row++) {
      this.cells[row] = new Array(this.columns);
    }
    var self = this;
    $(self.worldElement + " td").each(function(index) {
      row = parseInt(index / self.columns);
      column = index % self.columns;
      self.cells[row][column] = cell.spawn(this, row, column);
      var x = 0;
    });
  };

  World.prototype.hasLiveCells = function() {
    return this.liveCells ? (this.liveCells.length > 0 ? true : false) : false;
  };

  World.prototype.markLiveCells = function(cell) {
    if (typeof this.liveCells === 'undefined') {
      this.liveCells = new Array()
    }
    this.liveCells.push(cell);
  };

  World.prototype.init = function() {
    var world = $(this.worldElement);
    world.html("");
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      var rowContent = "<tr>"
      for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
        rowContent += this.cellTemplate;
      }
      world.append(rowContent + "</tr>");
    }
  };

  World.prototype.redraw = function() {
    for (var row = 0; row < this.cells.length; row++) {
      for (var column = 0; column < this.cells[row].length; column++) {
        var currentCell = this.getCellAt(row,column);
        currentCell.redraw();
      }
    }
  };

  World.prototype.getCellAt = function (row, column) {
    return this.cells[row][column];
  };

  World.prototype.getLivingNeighborsForCellAt = function(row, column) {
    var currentCell = this.getCellAt(row, column);
    var neighbors = currentCell.getNeighbors(this.rows, this.columns);
    var livingNeighbors = []
    for (var i = 0; i < neighbors.length; i++) {
      neighborCell = this.getCellAt(neighbors[i][0], neighbors[i][1]);
      if (neighborCell.isAlive) {
        livingNeighbors.push(neighborCell);
      }
    }
    return livingNeighbors;
  };

  return {
    map: function(options) {
      return (new World(options));
    }
  }
});

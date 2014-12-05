define(["cell"], function(cell) {
  var World = function(options) {
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
    return this.liveCells ? (this.liveCells.length > 0 ? true : false) : false;
  };

  World.prototype.markLiveCells = function(cell) {
    if (typeof this.liveCells === 'undefined') {
      this.liveCells = new Array()
    }
    this.liveCells.push(cell);
  };

  World.prototype.redraw = function() {
    var cells = this.cells;
    Object.keys(cells).map(function(key) {
      cells[key].redraw();
    });
  };

  World.prototype.getCellAt = function (row, column) {
    return this.cells["cell" + row + "_" + column];
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

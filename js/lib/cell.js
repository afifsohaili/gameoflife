define(function() {
  var ALIVE = "alive";
  var DEAD = "dead";

  var Cell = function(element, row, column) {
    this.row = row;
    this.column = column;
    this.element = element;
    this.isAlive = false;
  }

  Cell.prototype.getId = function() {
    return "cell" + this.row + "_" + this.column;
  };

  Cell.prototype.die = function() {
    this.isAlive = false;
  };

  Cell.prototype.revive = function(redraw) {
    this.isAlive = true;
  };

  Cell.prototype.redraw = function() {
    switch(this.isAlive) {
      case true:
        $(this.element).removeClass(DEAD);
        $(this.element).addClass(ALIVE);
        break;
      case false:
        $(this.element).removeClass(ALIVE);
        $(this.element).addClass(DEAD);
        break;
    }
  }

  Cell.prototype.getNeighbors = function(maxRow, maxColumn) {
    var possibleNeighbors = new Array();
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i == j && j == 0) continue;
        possibleNeighbors.push([this.row + i, this.column + j]);
      }
    }
    return possibleNeighbors.filter(this.withinBoundaries(maxRow, maxColumn));
  };

  Cell.prototype.withinBoundaries = function(maxRow, maxColumn) {
    return function(cell) {
      var result = (cell[0] >= 0 && cell[0] < maxRow) && (cell[1] >= 0 && cell[1] < maxColumn);
      return result;
    }
  }

  return {
    spawn: function(element, row, column) {
      return new Cell(element, row, column);
    }
  }
});

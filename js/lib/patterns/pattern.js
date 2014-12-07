define(function () {
  function Pattern(pattern, translation) {
    this.pattern = pattern;
    this.width = this.getWidth();
    this.height = this.getHeight();
    if (!(typeof translation === "undefined")) {
      this.pattern = this.translate(translation.row, translation.column);
    }
  }

  Pattern.prototype.getCellsMap = function() {
    return this.pattern;
  };

  Pattern.prototype.translate = function(rowDifference, columnDifference) {
    return this.pattern.map(function(cellCoordinates) {
      return [(cellCoordinates[0] + rowDifference),
              (cellCoordinates[1] + columnDifference)];
    });
  }

  Pattern.prototype.getWidth = function() {
    var max = this.pattern[0][1];
    var min = this.pattern[0][1];

    this.pattern.forEach(function (cellCoordinates) {
      if (cellCoordinates[1] > max) {
        max = cellCoordinates[1];
      }
      else if (cellCoordinates[1] < min) {
        min = cellCoordinates[1];
      }
    });

    return max - min;
  };

  Pattern.prototype.getHeight = function() {
    var max = this.pattern[0][0];
    var min = this.pattern[0][0];

    this.pattern.forEach(function (cellCoordinates) {
      if (cellCoordinates[0] > max) {
        max = cellCoordinates[0];
      }
      else if (cellCoordinates[0] < min) {
        min = cellCoordinates[0];
      }
    });

    return max - min;
  };

  return {
    initialize: function (cellsPattern, translation) {
      return new Pattern(cellsPattern, translation);
    }
  }
});

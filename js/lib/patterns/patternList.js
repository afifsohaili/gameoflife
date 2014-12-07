define(["worldOptions"], function(worldOptions) {
  return {
    acorn: {
      map: function() {
        return [[2,0], [0,1], [2,1], [1,3], [2,4], [2,5], [2,6]];
      }
    },
    gliderGun: {
      map: function() {
        return [
          [0,0],[0,1],[1,0],[1,1],[0,10],[1,10],[2,10],[3,11],[4,12],[4,13],
          [-1,11],[-2,12],[-2,13],[1,14],[-1,15],[0,16],[1,16],[2,16],[1,17],[3,15],
          [0,20],[-1,20],[-2,20],[0,21],[-1,21],[-2,21],[-3,22],[1,22],[-3,24],[1,24],
          [-4,24],[2,24],[-2,35],[-2,34],[-1,35],[-1,34]
        ];
      },
      translation: {
        row: 4,
        column: 0
      },
      element: "#glider-gun-btn"
    },
    random: {
      map: function() {
        var cells = {};
        for (var i = 0; i < parseInt(Math.random() * worldOptions.rows * worldOptions.columns); i++) {
          var randomRow = Math.random() * worldOptions.rows;
          var randomColumn = Math.random() * worldOptions.columns;

          if (!cells.hasOwnProperty()) {
            cells[randomRow + "_" + randomColumn] = [randomRow, randomColumn];
          }
        }
        return Object.keys(cells).map(function(key) {
          return cells[key];
        });
      }
    }
  }
});

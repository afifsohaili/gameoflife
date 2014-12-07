define(function() {
  function PatternBinding(pattern, controlUI, patternGenerator) {
    this.pattern = pattern;
    this.controlUI = controlUI;
    this.patternGenerator = patternGenerator;

    this.bindPatternAndControlUI('click');
  }

  PatternBinding.prototype.bindPatternAndControlUI = function(event) {
    var self = this;
    $(this.controlUI).on(event, function() {
      var randomPosition = self.patternGenerator.getRandomStartPosition(self.pattern.width, self.pattern.height);
      self.patternGenerator.generate(self.pattern.getCellsMap(), randomPosition.row, randomPosition.column);
    });
  };

  return {
    bind: function (pattern, controlUI, patternGenerator) {
      return new PatternBinding(pattern, controlUI, patternGenerator);
    }
  }
});

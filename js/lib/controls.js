define(function() {
  function Controls(options) {
    this.life = options.life;
    this.grantLifeControls(options.startButton, options.stopButton);
    this.intervalLengthInput = options.intervalLengthInput;
    this.intervalInstance = null;
  }

  Controls.prototype.grantLifeControls = function (startButton, stopButton) {
    var self = this;
    $(startButton).on('click', function() {
      self.intervalInstance = self.life.start(self.getIntervalSpecified());
    });
    $(stopButton).on('click', function() {
      clearInterval(self.intervalInstance);
      self.intervalInstance = null;
    });
  };

  Controls.prototype.getIntervalSpecified = function() {
    return parseInt($(this.intervalLengthInput).val());
  };

  return {
    attachTo: function(options) {
      return new Controls(options);
    }
  }
});

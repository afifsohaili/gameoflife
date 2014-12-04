define(function() {
  function Controls(options) {
    this.life = life;
    this.grantLifeControls(options.startButton, options.stopButton);
    this.intervalLengthInput = options.intervalLengthInput;
  }

  Controls.prototype.grantLifeControls = function (startButton, stopButton) {
    this.attachTo(startButton, this.startLife);
    this.attachTo(stopButton, this.endLife);
  };

  Controls.prototype.attachTo = function (btn, fn) {
    btn.on('click', fn);
  };

  Controls.prototype.startLife = function() {
    this.intervalInstance = this.life.start(this.getIntervalSpecified());
  }

  Controls.prototype.endLife = function() {
    clearInterval(this.intervalInstance);
  }

  Controls.prototype.getIntervalSpecified = function() {
    return parseInt($(this.intervalLengthInput).val());
  };

  return {
    attach: function(options) {
      return new Controls(options);
    }
  }
});

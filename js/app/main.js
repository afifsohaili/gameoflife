require(["worldOptions", "patterns/pattern", "world", "patterns/patternGenerator", "life", "controls", "patterns/patternList", "patterns/patternBinding"], function(worldOptions, pattern, world, patternGenerator, life, controls, patternList, patternBinding)
  {
  theWorld = world.map(worldOptions);

  patternGenerator.attach(theWorld);

  theLife = life.run(theWorld);

  controls.attachTo({
    life: theLife,
    startButton: "#start-life-btn",
    stopButton: "#stop-life-btn",
    intervalLengthInput: "#interval-length-input"
  });

  Object.keys(patternList).forEach(function (patternName) {
    var patternInstance = pattern.initialize(patternList[patternName].map(), patternList[patternName].translation);
    var patternElement = (typeof patternList[patternName].element === "undefined") ? "#" + patternName + "-btn" : patternList[patternName].element;
    patternBinding.bind(patternInstance, patternElement, patternGenerator);
  });
});

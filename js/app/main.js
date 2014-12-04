require(["pattern", "world", "life", "controls"], function(pattern, world, life, controls)
  {
  theWorld = world.map({
    rows: 50,
    columns: 150,
    world: "#world",
    cellTemplate: "<td class=\"dead\"></td>"
  });

  pattern = pattern.initialize(theWorld);
  // pattern.blinker();
  // pattern.acorn();
  pattern.gliderGun();
  theWorld.redraw();

  theLife = life.run(theWorld);
  
  controls.attachTo({
    life: theLife,
    startButton: "#start-life-btn",
    stopButton: "#stop-life-btn",
    intervalLengthInput: "#interval-length-input"
  });
});

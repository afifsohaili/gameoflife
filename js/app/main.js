require(["pattern", "world", "life"], function(pattern, world, life) {
  world = world.map({
    rows: 50,
    columns: 150,
    world: "#world",
    cellTemplate: "<td class=\"dead\"></td>"
  });

  pattern = pattern.initialize(world);
  // pattern.blinker();
  // pattern.acorn();
  pattern.gliderGun();
  world.redraw();

  life.attachWorld(world);

  life.start();
});

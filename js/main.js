function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateRadius(area) {
  return Math.sqrt(area / Math.PI);
}

function calculateArea(radius) {
  return Math.PI * Math.pow(radius, 2);
}

(function () {
  'use strict';

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  var totalTicks = 0;

  var actors = [];

  function tick() {
    var i;
    totalTicks++;

    var food = actors.filter(function (item) { return (item instanceof Food); });
    var cells = actors.filter(function (item) { return (item instanceof Cell); });

    // Create new food every 15 ticks (0.25 second at 60FPS).
    if (totalTicks % 15 === 0) {
      actors.push(new Food(getRandomArbitrary(2, 10), getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
    }

    for (i = cells.length; i < 5; i++) {
      actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
    }

    for (i = 0; i < actors.length; i++) {
      var cell = actors[i];
      if (typeof cell.look === 'function') { cell.look(actors); }
      cell.tick();
    }

    render();
  }

  function render() {
    var i;

    actors = actors.filter(function (item) { return !item.isDead; });
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < actors.length; i++) {
      actors[i].draw(context);
    }

    context.fillStyle = 'black';
    context.font = 'bold 16px Arial';
    context.fillText('Current Tick: ' + totalTicks, 10, 20);

    requestAnimationFrame(tick);
  }
  render();
}());

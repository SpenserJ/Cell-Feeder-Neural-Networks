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

  var actors = [];
  actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
  actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
  actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
  actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
  actors.push(new Cell(10, getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));

  function tick() {
    var i;

    actors = actors.filter(function (item) { return !item.isDead; });
    var food = actors.filter(function (item) { return (item instanceof Food); });
    var cells = actors.filter(function (item) { return (item instanceof Cell); });

    for (i = food.length; i < 8; i++) {
      actors.push(new Food(getRandomArbitrary(2, 10), getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
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

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < actors.length; i++) {
      actors[i].draw(context);
    }

    requestAnimationFrame(tick);
  }
  render();
}());

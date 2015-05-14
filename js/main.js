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

  var cells = [], food = [];
  cells.push(new Cell(10, canvas.width / 2, canvas.height / 2));

  function tick() {
    var i;
    for (i = 0; i < cells.length; i++) {
      cells[i].look(food);
      cells[i].tick();
    }

    food = food.filter(function (item) { return !item.isDead; });
    if (food.length === 0) {
      food.push(new Food(getRandomArbitrary(2, 10), getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height)));
    }

    render();
  }

  function render() {
    var i;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < cells.length; i++) {
      cells[i].draw(context);
    }

    for (i = 0; i < food.length; i++) {
      food[i].draw(context);
    }

    requestAnimationFrame(tick);
  }
  render();
}());

(function () {
  'use strict';

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  var Cell = function () {
    this.mass = 10;
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
  };

  Cell.prototype.draw = function () {
    var radius = this.mass;

    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
  };

  Cell.prototype.look = function () {
    var self = this;
    var nearby = [];
    food.forEach(function (item) {
      var distance = Math.sqrt(Math.pow(item.position.x - self.position.x, 2) + Math.pow(item.position.y - self.position.y, 2));
      var is_edible = (item.mass <= self.mass * 0.9);
      nearby.push({
        distance: distance,
        type: 'food',
        is_edible: is_edible,
        is_dangerous: false,
        object: item,
      });
    });
    self.nearby = nearby;
  };

  Cell.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
  };

  Cell.prototype.tick = function () {
    var self = this;
    this.look();

    var nearby = this.nearby.sort(function (a, b) {
      return (a.distance - b.distance);
    });

    nearby = nearby.filter(function (target) {
      if (self.hasCollided(target)) {
        food.splice(food.indexOf(target.object), 1);
        self.mass += target.object.mass;
        // Create a new food
        setTimeout(function () {
          food.push(new Food());
        }, 500);
        return false;
      }
      return true;
    });

    if (nearby.length === 0) {
      this.move(this.position.x + getRandomArbitrary(-1, 1), this.position.y + getRandomArbitrary(-1, 1));
    } else {
      var closest = nearby[0];
      var deltaX = (closest.object.position.x - this.position.x);
      var deltaY = (closest.object.position.y - this.position.y);
      var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      this.move(this.position.x + Math.cos(angle), this.position.y + Math.sin(angle));
    }
  };

  Cell.prototype.hasCollided = function (target) {
    return (this.mass + target.object.mass) >= target.distance;
  };


  var Food = function () {
    this.mass = getRandomArbitrary(2,10);
    this.position = {
      x: getRandomArbitrary(0, canvas.width),
      y: getRandomArbitrary(0, canvas.height),
    };
  };

  Food.prototype.draw = function () {
    var radius = this.mass;

    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003333';
    context.stroke();
  };

  var cells = [], food = [];
  cells.push(new Cell());
  food.push(new Food());

  function tick() {
    var i;
    for (i = 0; i < cells.length; i++) {
      cells[i].tick();
    }

    render();
  }

  function render() {
    var i;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < cells.length; i++) {
      cells[i].draw();
    }

    for (i = 0; i < food.length; i++) {
      food[i].draw();
    }

    requestAnimationFrame(tick);
  }
  render();
}());

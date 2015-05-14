class Cell extends Circle {
  constructor(radius, x, y) {
    super(radius, x, y);

    this.background = 'green';
    this.border = '#003300';
  }

  look(food) {
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
  }

  move(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  tick() {
    var self = this;

    var nearby = this.nearby.sort(function (a, b) {
      return (a.distance - b.distance);
    });

    nearby = nearby.filter(function (target) {
      if (self.hasCollided(target)) {
        target.object.isDead = true;
        self.mass += target.object.mass;
        self.radius = calculateRadius(self.mass);
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
  }
};

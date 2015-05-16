class Cell extends Circle {
  constructor(radius, x, y) {
    super(radius, x, y);

    this.updateSpeed();
    this.updateDecayRate();
    this.isDead = false;
    this.background = 'green';
    this.border = '#003300';
  }

  updateSpeed() {
    this.speed = (1.2 / (Math.log(this.mass) / Math.log(calculateArea(10))));
  }

  updateDecayRate() {
    // Small cells shouldn't decay.
    var massLog = Math.log(this.mass) - Math.log(calculateArea(10));
    this.decayRate = massLog;
  }

  look(actors) {
    var self = this;
    var nearby = [];
    actors.forEach(function (item) {
      // Don't detect ourselves.
      if (self === item) { return; }

      var distance = Math.sqrt(Math.pow(item.position.x - self.position.x, 2) + Math.pow(item.position.y - self.position.y, 2));
      var is_edible = (item.mass <= self.mass * 0.9);
      var is_dangerous = ((self.mass <= item.mass * 0.9) && item.constructor.name === 'Cell');
      nearby.push({
        distance: distance,
        type: item.constructor.name,
        is_edible: is_edible,
        is_dangerous: is_dangerous,
        object: item,
      });
    });
    self.nearby = nearby;
  }

  move(x, y) {
    x = x * this.speed;
    y = y * this.speed;
    this.position.x += x;
    this.position.y += y;
  }

  tick() {
    var self = this;

    self.updateDecayRate();
    // Ensure the mass never dips below that of a small cell.
    self.mass = Math.max(self.mass - self.decayRate, calculateArea(10));
    self.radius = calculateRadius(self.mass);

    var nearby = this.nearby.sort(function (a, b) {
      return (a.distance - b.distance);
    });

    nearby = nearby.filter(function (target) {
      if (self.hasCollided(target) && target.is_edible) {
        target.object.isDead = true;
        self.mass += target.object.mass;
        self.radius = calculateRadius(self.mass);
        self.updateSpeed();
        return false;
      }
      return true;
    });

    var nearbyFood = nearby.filter(function (target) { return target.is_edible; });

    if (nearbyFood.length === 0) {
      this.move(getRandomArbitrary(-1, 1), getRandomArbitrary(-1, 1));
    } else {
      var closest = nearbyFood[0];
      var deltaX = (closest.object.position.x - this.position.x);
      var deltaY = (closest.object.position.y - this.position.y);
      var angle = Math.atan2(deltaY, deltaX);
      this.move(Math.cos(angle), Math.sin(angle));
    }

    self.text = Math.round(self.radius, 0);
  }
};

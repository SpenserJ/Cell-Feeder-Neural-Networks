class Circle {
  constructor(radius, x, y) {
    this.radius = radius;
    this.mass = calculateArea(radius);
    this.position = {
      x: x,
      y: y,
    };
    this.background = 'yellow';
    this.border = '#d6d62a';
  }

  hasCollided(target) {
    return (this.radius + target.object.radius) >= target.distance;
  }

  tick() {}

  draw(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.background;
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = this.border;
    context.stroke();

    if (typeof this.text !== 'undefined') {
      context.fillStyle = 'black';
      context.font = 'bold 12px Arial';
      var textX = this.position.x - context.measureText(this.text).width / 2;
      var textY = this.position.y + 4;
      context.fillText(this.text, textX, textY);
    }
  }
};

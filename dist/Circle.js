'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Circle = (function () {
  function Circle(radius, x, y) {
    _classCallCheck(this, Circle);

    this.radius = radius;
    this.position = {
      x: x,
      y: y };
  }

  _createClass(Circle, [{
    key: 'draw',
    value: function draw() {
      context.beginPath();
      context.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'yellow';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#003333';
      context.stroke();
    }
  }]);

  return Circle;
})();

;
import Shape from './shapes.object.class';

export default class RegularPolygon extends Shape {
  constructor(option) {
    super(option);
    this.type = 'regular-polygon';
  }
  getCenter() {
    if (!this.x && this.x !== 0 || !this.y && this.y !== 0) {
      throw "x or y property is required!";
    }
    return {
      x: this.x,
      y: this.y
    }
  }
  getSize() {
    return this.size || 20;
  }
  getPoints() {
    let points = [],
        center = this.getCenter(),
        startAngle = this.startAngle || 0,
        size = this.getSize(),
        sides = this.sides || 3,
        angleStep = Math.PI * 2 / sides;
    for (let i = 0; i < sides; i++) {
      points.push({
        x: center.x + size * Math.cos(startAngle),
        y: center.y + size * Math.sin(startAngle)
      });
      startAngle += angleStep;
    }
    return points;
  }
  render(ctx) {
    let points = this.getPoints();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1, len = points.length; i < len; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

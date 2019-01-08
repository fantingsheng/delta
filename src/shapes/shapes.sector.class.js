import Shape from './shapes.object.class';

export default class Sector extends Shape {
  constructor(option) {
    super(option);
    this.type = 'sector';
    this.radius = option.radius || 20;
    this.startAngle = option.startAngle || 0;
    this.endAngle = option.endAngle || Math.PI * 2;
    this.clockwise = option.clockwise || true;
  }

  render(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    if (Math.abs(this.endAngle - this.startAngle - Math.PI * 2) < 0.001) {
      ctx.arc(this.x, this.y, this.radius,
              this.startAngle, this.endAngle, !this.clockwise);
    } else {
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x, this.y, this.radius,
              this.startAngle, this.endAngle, !this.clockwise);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

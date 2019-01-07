import utils from './utils/delta.utils';

export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(that) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }
  subtract(that) {
    this.x -= that.x;
    this.y -= that.y;
    return this;
  }
  dot(that) {
    return this.x * that.x + this.y * that.y;
  }
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static subtract(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
  scale(ratio) {
    this.x *= ratio;
    this.y *= ratio;
    return this;
  }
  rotate(angle) {
    const radian = utils.angle2Radian(angle),
          sin = Math.sin(radian),
          cos = Math.cos(radian);
    this.x = this.x * cos - this.y * sin;
    this.y = this.x * sin - this.y * cos;
    return this;
  }
}

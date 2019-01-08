import settings from '../delta.settings';

export default class Shape {
  constructor(option) {
    Object.assign(this, option);
    this.type = 'shape';
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.fillStyle = option.fillStyle || settings('fillStyle');
    this.strokeStyle = option.strokeStyle || settings('strokeStyle');
    this.lineWidth = option.lineWidth || settings('lineWidth');
  }
  render(ctx) {
    console.log('implemented in child class');
  }
}

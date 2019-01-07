export default class Shape {
  constructor(option) {
    Object.assign(this, option);
    this.type = 'shape';
    this.x = option.x || 0;
    this.y = option.y || 0;
  }
  render(ctx) {
    console.log('implemented in child class');
  }
}

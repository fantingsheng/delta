import Vector from './delta.vector';
import Dispatcher from './delta.dispatcher';
import * as utils from './utils/delta.utils';
import settings from './delta.settings';
import bindEvent from './delta.events';
import Interaction from './delta.interaction';
export default class Delta extends Dispatcher {
  constructor(option) {
    super();
    this.option = option || {};
    this.container = this.option.container;
    if (!this.container) {
      this.container = document.body;
    }
    if (option.settings) {
      settings(option.settings);
    }
    if (typeof this.container === 'string') {
      this.container = document.getElementById(this.container);
    }
    this.initCanvas(this.container);
    if (this.option.hasGrid) {
      utils.drawGrid(this.context);
    }
    Object.defineProperty(this, '_objects', {
      value: [],
      writable: true
    });
    Object.defineProperty(this, '_transform', {
      value: {
        translate: [0, 0],
        angle: 0,  //弧度值
        scale: [1, 1]
      },
      writable: true
    })
    this.bindEvents();
    bindEvent(this, this.canvas);
    this.interaction = new Interaction(this);
  }
  shapes() {
    return this._objects;
  }
  initCanvas(container) {
    let canvas = this.canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.id = 'delta-canvas';
    container.appendChild(canvas);
    this.context = canvas.getContext('2d');
  }
  resize() {
    this.canvas.width = this.container.offsetWidth ;
    this.canvas.height = this.container.offsetHeight;
    this.refreshAll();
  }
  refreshAll() {
    let canvas = this.context.canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    if (this.option.hasGrid) {
      utils.drawGrid(this.context);
    }
    this.render(this._objects);
  }
  render(shapes) {
    let ctx = this.context;
    let matrix = this.getTransformMatrix();
    ctx.save();
    ctx.transform(...matrix);
    //ctx.translate(...this._transform.translate);
    //ctx.scale(...this._transform.scale);
    if (!Array.isArray(shapes)) {
      shapes = [shapes];
    }
    shapes.forEach( (shape) => {
      shape.render(ctx);
    });
    ctx.restore();
  }
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  add(shapes) {
    if (!Array.isArray(shapes)) {
      shapes = [shape];
    }
    this._objects.push(...shapes);
    this.render(shapes);
  }
  remove(shape) {
    let size = this._objects.length;
    while (size--) {
      if (this._objects[size] === shape) {
        this._objects.splice(size, 1);
      }
    }
  }
  getTransformMatrix() {
    let t = this._transform;
    let cm = utils.getScaleMatrix(t.scale[0]),
        tm = utils.getTranslateMatrix(t.translate),
        rm = utils.getRotateMatrix(t.angle),
        m = utils.multiplyMatrix(utils.multiplyMatrix(tm, rm), cm);
    return [m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]];
  }
}

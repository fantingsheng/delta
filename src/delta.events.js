import Dispatcher from './delta.dispatcher';
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let shiftX = 0;
let shiftY = 0;
let _this = null;
export default function bindEvent(self, target) {
  if (!(self instanceof Dispatcher)) {
    throw 'self param must be instance of Dispatcher.';
  }
  if (!target) {
    target = document.body;
  }
  _this = self;
  target.addEventListener('mousedown', _mouseDownHandler);
  target.addEventListener('mousemove', _mouseMoveHandler);
  target.addEventListener('mouseup', _mouseUpHandler);
  target.addEventListener('mousewheel', _mouseWheelHandler);
  target.addEventListener('dblclick', _dblClickHandler);
  target.addEventListener('click', _clickHandler);
}
function _mouseDownHandler(e) {

}
function _mouseMoveHandler(e) {

}
function _mouseUpHandler(e) {

}
function _mouseWheelHandler(e) {
  let delta = (e.wheelDelta !== undefined && e.wheelDelta) ||
      (e.detail !== undefined && -e.detail);
  _this.dispatchEvent('zoom', {
    delta: delta,
    x: e.offsetX,
    y: e.offsetY,
    e: e
  });
}
function _dblClickHandler() {

}
function _clickHandler() {

}

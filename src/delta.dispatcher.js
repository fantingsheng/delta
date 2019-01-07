export default class Dispatcher {
  constructor() {
    this._events = {};
  }
  bind(event, fn) {
    if (!event || !fn) {
      return;
    }
    if (!this._events[event]) {
      this._events[event] = [];
    }
    if (this._events[event].indexOf(fn) === -1) {
      this._events[event].push(fn);
    }
  }
  dispatchEvent(event, param) {
    if (this._events[event]) {
      let events = this._events[event];
      for (let i = 0; i < events.length; i++) {
        if (events[i].call(this, param) === false) {
          break;
        }
      }
    }
  }
  unbind(event, fn) {
    if (!event) {
      return;
    }
    if (!fn) {
      delete this._events[event];
      return;
    }
    let events = this._events[event];
    let size = events.length;
    while (size--) {
      if (events[size] === fn) {
        events.splice(size, 1);
        break;
      }
    }
  }
}

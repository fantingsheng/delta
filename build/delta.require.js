(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _delta = _interopRequireDefault(require("./delta.vector"));

var _delta2 = _interopRequireDefault(require("./delta.dispatcher"));

var utils = _interopRequireWildcard(require("./utils/delta.utils"));

var _delta4 = _interopRequireDefault(require("./delta.settings"));

var _delta5 = _interopRequireDefault(require("./delta.events"));

var _delta6 = _interopRequireDefault(require("./delta.interaction"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Delta =
/*#__PURE__*/
function (_Dispatcher) {
  _inherits(Delta, _Dispatcher);

  function Delta(option) {
    var _this;

    _classCallCheck(this, Delta);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Delta).call(this));
    _this.option = option || {};
    _this.container = _this.option.container;

    if (!_this.container) {
      _this.container = document.body;
    }

    if (option.settings) {
      (0, _delta4.default)(option.settings);
    }

    if (typeof _this.container === 'string') {
      _this.container = document.getElementById(_this.container);
    }

    _this.initCanvas(_this.container);

    if (_this.option.hasGrid) {
      utils.drawGrid(_this.context);
    }

    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), '_objects', {
      value: [],
      writable: true
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), '_transform', {
      value: {
        translate: [0, 0],
        angle: 0,
        //弧度值
        scale: [1, 1]
      },
      writable: true
    });

    _this.bindEvents();

    (0, _delta5.default)(_assertThisInitialized(_assertThisInitialized(_this)), _this.canvas);
    _this.interaction = new _delta6.default(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Delta, [{
    key: "shapes",
    value: function shapes() {
      return this._objects;
    }
  }, {
    key: "initCanvas",
    value: function initCanvas(container) {
      var canvas = this.canvas = document.createElement('canvas');
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      canvas.id = 'delta-canvas';
      container.appendChild(canvas);
      this.context = canvas.getContext('2d');
    }
  }, {
    key: "resize",
    value: function resize() {
      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;
      this.refreshAll();
    }
  }, {
    key: "refreshAll",
    value: function refreshAll() {
      var canvas = this.context.canvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      if (this.option.hasGrid) {
        utils.drawGrid(this.context);
      }

      this.render(this._objects);
    }
  }, {
    key: "render",
    value: function render(shapes) {
      var ctx = this.context;
      var matrix = this.getTransformMatrix();
      ctx.save();
      ctx.transform.apply(ctx, _toConsumableArray(matrix)); //ctx.translate(...this._transform.translate);
      //ctx.scale(...this._transform.scale);

      if (!Array.isArray(shapes)) {
        shapes = [shapes];
      }

      shapes.forEach(function (shape) {
        shape.render(ctx);
      });
      ctx.restore();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        _this2.resize();
      });
    }
  }, {
    key: "add",
    value: function add(shapes) {
      var _this$_objects;

      if (!Array.isArray(shapes)) {
        shapes = [shape];
      }

      (_this$_objects = this._objects).push.apply(_this$_objects, _toConsumableArray(shapes));

      this.render(shapes);
    }
  }, {
    key: "remove",
    value: function remove(shape) {
      var size = this._objects.length;

      while (size--) {
        if (this._objects[size] === shape) {
          this._objects.splice(size, 1);
        }
      }
    }
  }, {
    key: "getTransformMatrix",
    value: function getTransformMatrix() {
      var t = this._transform;
      var cm = utils.getScaleMatrix(t.scale[0]),
          tm = utils.getTranslateMatrix(t.translate),
          rm = utils.getRotateMatrix(t.angle),
          m = utils.multiplyMatrix(utils.multiplyMatrix(tm, rm), cm);
      return [m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]];
    }
  }]);

  return Delta;
}(_delta2.default);

exports.default = Delta;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLmNvcmUuanMiXSwibmFtZXMiOlsiRGVsdGEiLCJvcHRpb24iLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJzZXR0aW5ncyIsImdldEVsZW1lbnRCeUlkIiwiaW5pdENhbnZhcyIsImhhc0dyaWQiLCJ1dGlscyIsImRyYXdHcmlkIiwiY29udGV4dCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsInRyYW5zbGF0ZSIsImFuZ2xlIiwic2NhbGUiLCJiaW5kRXZlbnRzIiwiY2FudmFzIiwiaW50ZXJhY3Rpb24iLCJJbnRlcmFjdGlvbiIsIl9vYmplY3RzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJpZCIsImFwcGVuZENoaWxkIiwiZ2V0Q29udGV4dCIsInJlZnJlc2hBbGwiLCJjbGVhclJlY3QiLCJyZW5kZXIiLCJzaGFwZXMiLCJjdHgiLCJtYXRyaXgiLCJnZXRUcmFuc2Zvcm1NYXRyaXgiLCJzYXZlIiwidHJhbnNmb3JtIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInNoYXBlIiwicmVzdG9yZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJwdXNoIiwic2l6ZSIsImxlbmd0aCIsInNwbGljZSIsInQiLCJfdHJhbnNmb3JtIiwiY20iLCJnZXRTY2FsZU1hdHJpeCIsInRtIiwiZ2V0VHJhbnNsYXRlTWF0cml4Iiwicm0iLCJnZXRSb3RhdGVNYXRyaXgiLCJtIiwibXVsdGlwbHlNYXRyaXgiLCJEaXNwYXRjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7OztBQUNuQixpQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUNsQjtBQUNBLFVBQUtBLE1BQUwsR0FB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QUc5QyxLQUFLLENBQUMrQyxjQUFOLENBQXFCSCxDQUFDLENBQUNuQyxLQUFGLENBQVEsQ0FBUixDQUFyQixDQUFUO0FBQUEsVUFDSXVDLEVBQUUsR0FBR2hELEtBQUssQ0FBQ2lELGtCQUFOLENBQXlCTCxDQUFDLENBQUNyQyxTQUEzQixDQURUO0FBQUEsVUFFSTJDLEVBQUUsR0FBR2xELEtBQUssQ0FBQ21ELGVBQU4sQ0FBc0JQLENBQUMsQ0FBQ3BDLEtBQXhCLENBRlQ7QUFBQSxVQUdJNEMsQ0FBQyxHQUFHcEQsS0FBSyxDQUFDcUQsY0FBTixDQUFxQnJELEtBQUssQ0FBQ3FELGNBQU4sQ0FBcUJMLEVBQXJCLEVBQXlCRSxFQUF6QixDQUFyQixFQUFtREosRUFBbkQsQ0FIUjtBQUlBLGFBQU8sQ0FBQ00sQ0FBQyxDQUFDLENBQUQsQ0FBRCxDQUFLLENBQUwsQ0FBRCxFQUFVQSxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUssQ0FBTCxDQUFWLEVBQW1CQSxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUssQ0FBTCxDQUFuQixFQUE0QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxDQUFLLENBQUwsQ0FBNUIsRUFBcUNBLENBQUMsQ0FBQyxDQUFELENBQUQsQ0FBSyxDQUFMLENBQXJDLEVBQThDQSxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUssQ0FBTCxDQUE5QyxDQUFQO0FBQ0Q7Ozs7RUFwR2dDRSxlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvciBmcm9tICcuL2RlbHRhLnZlY3Rvcic7XHJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vZGVsdGEuZGlzcGF0Y2hlcic7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvZGVsdGEudXRpbHMnO1xyXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9kZWx0YS5zZXR0aW5ncyc7XHJcbmltcG9ydCBiaW5kRXZlbnQgZnJvbSAnLi9kZWx0YS5ldmVudHMnO1xyXG5pbXBvcnQgSW50ZXJhY3Rpb24gZnJvbSAnLi9kZWx0YS5pbnRlcmFjdGlvbic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhIGV4dGVuZHMgRGlzcGF0Y2hlciB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9uKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vcHRpb24gPSBvcHRpb24gfHwge307XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMub3B0aW9uLmNvbnRhaW5lcjtcclxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbi5zZXR0aW5ncykge1xyXG4gICAgICBzZXR0aW5ncyhvcHRpb24uc2V0dGluZ3MpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaXRDYW52YXModGhpcy5jb250YWluZXIpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLmhhc0dyaWQpIHtcclxuICAgICAgdXRpbHMuZHJhd0dyaWQodGhpcy5jb250ZXh0KTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX29iamVjdHMnLCB7XHJcbiAgICAgIHZhbHVlOiBbXSxcclxuICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfdHJhbnNmb3JtJywge1xyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIHRyYW5zbGF0ZTogWzAsIDBdLFxyXG4gICAgICAgIGFuZ2xlOiAwLCAgLy/lvKfluqblgLxcclxuICAgICAgICBzY2FsZTogWzEsIDFdXHJcbiAgICAgIH0sXHJcbiAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICBiaW5kRXZlbnQodGhpcywgdGhpcy5jYW52YXMpO1xyXG4gICAgdGhpcy5pbnRlcmFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbih0aGlzKTtcclxuICB9XHJcbiAgc2hhcGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29iamVjdHM7XHJcbiAgfVxyXG4gIGluaXRDYW52YXMoY29udGFpbmVyKSB7XHJcbiAgICBsZXQgY2FudmFzID0gdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY2FudmFzLmlkID0gJ2RlbHRhLWNhbnZhcyc7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIH1cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY29udGFpbmVyLm9mZnNldFdpZHRoIDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gIH1cclxuICByZWZyZXNoQWxsKCkge1xyXG4gICAgbGV0IGNhbnZhcyA9IHRoaXMuY29udGV4dC5jYW52YXM7XHJcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb24uaGFzR3JpZCkge1xyXG4gICAgICB1dGlscy5kcmF3R3JpZCh0aGlzLmNvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIodGhpcy5fb2JqZWN0cyk7XHJcbiAgfVxyXG4gIHJlbmRlcihzaGFwZXMpIHtcclxuICAgIGxldCBjdHggPSB0aGlzLmNvbnRleHQ7XHJcbiAgICBsZXQgbWF0cml4ID0gdGhpcy5nZXRUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHgudHJhbnNmb3JtKC4uLm1hdHJpeCk7XHJcbiAgICAvL2N0eC50cmFuc2xhdGUoLi4udGhpcy5fdHJhbnNmb3JtLnRyYW5zbGF0ZSk7XHJcbiAgICAvL2N0eC5zY2FsZSguLi50aGlzLl90cmFuc2Zvcm0uc2NhbGUpO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNoYXBlcykpIHtcclxuICAgICAgc2hhcGVzID0gW3NoYXBlc107XHJcbiAgICB9XHJcbiAgICBzaGFwZXMuZm9yRWFjaCggKHNoYXBlKSA9PiB7XHJcbiAgICAgIHNoYXBlLnJlbmRlcihjdHgpO1xyXG4gICAgfSk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG4gIH1cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBhZGQoc2hhcGVzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2hhcGVzKSkge1xyXG4gICAgICBzaGFwZXMgPSBbc2hhcGVdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fb2JqZWN0cy5wdXNoKC4uLnNoYXBlcyk7XHJcbiAgICB0aGlzLnJlbmRlcihzaGFwZXMpO1xyXG4gIH1cclxuICByZW1vdmUoc2hhcGUpIHtcclxuICAgIGxldCBzaXplID0gdGhpcy5fb2JqZWN0cy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoc2l6ZS0tKSB7XHJcbiAgICAgIGlmICh0aGlzLl9vYmplY3RzW3NpemVdID09PSBzaGFwZSkge1xyXG4gICAgICAgIHRoaXMuX29iamVjdHMuc3BsaWNlKHNpemUsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFRyYW5zZm9ybU1hdHJpeCgpIHtcclxuICAgIGxldCB0ID0gdGhpcy5fdHJhbnNmb3JtO1xyXG4gICAgbGV0IGNtID0gdXRpbHMuZ2V0U2NhbGVNYXRyaXgodC5zY2FsZVswXSksXHJcbiAgICAgICAgdG0gPSB1dGlscy5nZXRUcmFuc2xhdGVNYXRyaXgodC50cmFuc2xhdGUpLFxyXG4gICAgICAgIHJtID0gdXRpbHMuZ2V0Um90YXRlTWF0cml4KHQuYW5nbGUpLFxyXG4gICAgICAgIG0gPSB1dGlscy5tdWx0aXBseU1hdHJpeCh1dGlscy5tdWx0aXBseU1hdHJpeCh0bSwgcm0pLCBjbSk7XHJcbiAgICByZXR1cm4gW21bMF1bMF0sIG1bMV1bMF0sIG1bMF1bMV0sIG1bMV1bMV0sIG1bMF1bMl0sIG1bMV1bMl1dO1xyXG4gIH1cclxufVxyXG4iXX0=
},{"./delta.dispatcher":2,"./delta.events":3,"./delta.interaction":4,"./delta.settings":5,"./delta.vector":6,"./utils/delta.utils":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dispatcher =
/*#__PURE__*/
function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._events = {};
  }

  _createClass(Dispatcher, [{
    key: "bind",
    value: function bind(event, fn) {
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
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event, param) {
      if (this._events[event]) {
        var events = this._events[event];

        for (var i = 0; i < events.length; i++) {
          if (events[i].call(this, param) === false) {
            break;
          }
        }
      }
    }
  }, {
    key: "unbind",
    value: function unbind(event, fn) {
      if (!event) {
        return;
      }

      if (!fn) {
        delete this._events[event];
        return;
      }

      var events = this._events[event];
      var size = events.length;

      while (size--) {
        if (events[size] === fn) {
          events.splice(size, 1);
          break;
        }
      }
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLmRpc3BhdGNoZXIuanMiXSwibmFtZXMiOlsiRGlzcGF0Y2hlciIsIl9ldmVudHMiLCJldmVudCIsImZuIiwiaW5kZXhPZiIsInB1c2giLCJwYXJhbSIsImV2ZW50cyIsImkiLCJsZW5ndGgiLCJjYWxsIiwic2l6ZSIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFxQkEsVTs7O0FBQ25CLHdCQUFjO0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDRDs7Ozt5QkFDSUMsSyxFQUFPQyxFLEVBQUk7QUFDZCxVQUFJLENBQUNELEtBQUQsSUFBVSxDQUFDQyxFQUFmLEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDLEtBQUtGLE9BQUwsQ0FBYUMsS0FBYixDQUFMLEVBQTBCO0FBQ3hCLGFBQUtELE9BQUwsQ0FBYUMsS0FBYixJQUFzQixFQUF0QjtBQUNEOztBQUNELFVBQUksS0FBS0QsT0FBTCxDQUFhQyxLQUFiLEVBQW9CRSxPQUFwQixDQUE0QkQsRUFBNUIsTUFBb0MsQ0FBQyxDQUF6QyxFQUE0QztBQUMxQyxhQUFLRixPQUFMLENBQWFDLEtBQWIsRUFBb0JHLElBQXBCLENBQXlCRixFQUF6QjtBQUNEO0FBQ0Y7OztrQ0FDYUQsSyxFQUFPSSxLLEVBQU87QUFDMUIsVUFBSSxLQUFLTCxPQUFMLENBQWFDLEtBQWIsQ0FBSixFQUF5QjtBQUN2QixZQUFJSyxNQUFNLEdBQUcsS0FBS04sT0FBTCxDQUFhQyxLQUFiLENBQWI7O0FBQ0EsYUFBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxNQUFNLENBQUNFLE1BQTNCLEVBQW1DRCxDQUFDLEVBQXBDLEVBQXdDO0FBQ3RDLGNBQUlELE1BQU0sQ0FBQ0MsQ0FBRCxDQUFOLENBQVVFLElBQVYsQ0FBZSxJQUFmLEVBQXFCSixLQUFyQixNQUFnQyxLQUFwQyxFQUEyQztBQUN6QztBQUNEO0FBQ0Y7QUFDRjtBQUNGOzs7MkJBQ01KLEssRUFBT0MsRSxFQUFJO0FBQ2hCLFVBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFDRCxVQUFJLENBQUNDLEVBQUwsRUFBUztBQUNQLGVBQU8sS0FBS0YsT0FBTCxDQUFhQyxLQUFiLENBQVA7QUFDQTtBQUNEOztBQUNELFVBQUlLLE1BQU0sR0FBRyxLQUFLTixPQUFMLENBQWFDLEtBQWIsQ0FBYjtBQUNBLFVBQUlTLElBQUksR0FBR0osTUFBTSxDQUFDRSxNQUFsQjs7QUFDQSxhQUFPRSxJQUFJLEVBQVgsRUFBZTtBQUNiLFlBQUlKLE1BQU0sQ0FBQ0ksSUFBRCxDQUFOLEtBQWlCUixFQUFyQixFQUF5QjtBQUN2QkksVUFBQUEsTUFBTSxDQUFDSyxNQUFQLENBQWNELElBQWQsRUFBb0IsQ0FBcEI7QUFDQTtBQUNEO0FBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BhdGNoZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fZXZlbnRzID0ge307XHJcbiAgfVxyXG4gIGJpbmQoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAoIWV2ZW50IHx8ICFmbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0pIHtcclxuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmbikgPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmbik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBhcmFtKSB7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRzW2V2ZW50XSkge1xyXG4gICAgICBsZXQgZXZlbnRzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXZlbnRzW2ldLmNhbGwodGhpcywgcGFyYW0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVuYmluZChldmVudCwgZm4pIHtcclxuICAgIGlmICghZXZlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFmbikge1xyXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tldmVudF07XHJcbiAgICBsZXQgc2l6ZSA9IGV2ZW50cy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoc2l6ZS0tKSB7XHJcbiAgICAgIGlmIChldmVudHNbc2l6ZV0gPT09IGZuKSB7XHJcbiAgICAgICAgZXZlbnRzLnNwbGljZShzaXplLCAxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bindEvent;

var _delta = _interopRequireDefault(require("./delta.dispatcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDragging = false;
var startX = 0;
var startY = 0;
var currentX = 0;
var currentY = 0;
var shiftX = 0;
var shiftY = 0;
var _this = null;

function bindEvent(self, target) {
  if (!(self instanceof _delta.default)) {
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

function _mouseDownHandler(e) {}

function _mouseMoveHandler(e) {}

function _mouseUpHandler(e) {}

function _mouseWheelHandler(e) {
  var delta = e.wheelDelta !== undefined && e.wheelDelta || e.detail !== undefined && -e.detail;

  _this.dispatchEvent('zoom', {
    delta: delta,
    x: e.offsetX,
    y: e.offsetY,
    e: e
  });
}

function _dblClickHandler() {}

function _clickHandler() {}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLmV2ZW50cy5qcyJdLCJuYW1lcyI6WyJpc0RyYWdnaW5nIiwic3RhcnRYIiwic3RhcnRZIiwiY3VycmVudFgiLCJjdXJyZW50WSIsInNoaWZ0WCIsInNoaWZ0WSIsIl90aGlzIiwiYmluZEV2ZW50Iiwic2VsZiIsInRhcmdldCIsIkRpc3BhdGNoZXIiLCJkb2N1bWVudCIsImJvZHkiLCJhZGRFdmVudExpc3RlbmVyIiwiX21vdXNlRG93bkhhbmRsZXIiLCJfbW91c2VNb3ZlSGFuZGxlciIsIl9tb3VzZVVwSGFuZGxlciIsIl9tb3VzZVdoZWVsSGFuZGxlciIsIl9kYmxDbGlja0hhbmRsZXIiLCJfY2xpY2tIYW5kbGVyIiwiZSIsImRlbHRhIiwid2hlZWxEZWx0YSIsInVuZGVmaW5lZCIsImRldGFpbCIsImRpc3BhdGNoRXZlbnQiLCJ4Iiwib2Zmc2V0WCIsInkiLCJvZmZzZXRZIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQSxJQUFJQSxVQUFVLEdBQUcsS0FBakI7QUFDQSxJQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUNBLElBQUlDLE1BQU0sR0FBRyxDQUFiO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLE1BQU0sR0FBRyxDQUFiO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLENBQWI7QUFDQSxJQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFDZSxTQUFTQyxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDOUMsTUFBSSxFQUFFRCxJQUFJLFlBQVlFLGNBQWxCLENBQUosRUFBbUM7QUFDakMsVUFBTSw0Q0FBTjtBQUNEOztBQUNELE1BQUksQ0FBQ0QsTUFBTCxFQUFhO0FBQ1hBLElBQUFBLE1BQU0sR0FBR0UsUUFBUSxDQUFDQyxJQUFsQjtBQUNEOztBQUNETixFQUFBQSxLQUFLLEdBQUdFLElBQVI7QUFDQUMsRUFBQUEsTUFBTSxDQUFDSSxnQkFBUCxDQUF3QixXQUF4QixFQUFxQ0MsaUJBQXJDO0FBQ0FMLEVBQUFBLE1BQU0sQ0FBQ0ksZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUNFLGlCQUFyQztBQUNBTixFQUFBQSxNQUFNLENBQUNJLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DRyxlQUFuQztBQUNBUCxFQUFBQSxNQUFNLENBQUNJLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDSSxrQkFBdEM7QUFDQVIsRUFBQUEsTUFBTSxDQUFDSSxnQkFBUCxDQUF3QixVQUF4QixFQUFvQ0ssZ0JBQXBDO0FBQ0FULEVBQUFBLE1BQU0sQ0FBQ0ksZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNNLGFBQWpDO0FBQ0Q7O0FBQ0QsU0FBU0wsaUJBQVQsQ0FBMkJNLENBQTNCLEVBQThCLENBRTdCOztBQUNELFNBQVNMLGlCQUFULENBQTJCSyxDQUEzQixFQUE4QixDQUU3Qjs7QUFDRCxTQUFTSixlQUFULENBQXlCSSxDQUF6QixFQUE0QixDQUUzQjs7QUFDRCxTQUFTSCxrQkFBVCxDQUE0QkcsQ0FBNUIsRUFBK0I7QUFDN0IsTUFBSUMsS0FBSyxHQUFJRCxDQUFDLENBQUNFLFVBQUYsS0FBaUJDLFNBQWpCLElBQThCSCxDQUFDLENBQUNFLFVBQWpDLElBQ1BGLENBQUMsQ0FBQ0ksTUFBRixLQUFhRCxTQUFiLElBQTBCLENBQUNILENBQUMsQ0FBQ0ksTUFEbEM7O0FBRUFsQixFQUFBQSxLQUFLLENBQUNtQixhQUFOLENBQW9CLE1BQXBCLEVBQTRCO0FBQzFCSixJQUFBQSxLQUFLLEVBQUVBLEtBRG1CO0FBRTFCSyxJQUFBQSxDQUFDLEVBQUVOLENBQUMsQ0FBQ08sT0FGcUI7QUFHMUJDLElBQUFBLENBQUMsRUFBRVIsQ0FBQyxDQUFDUyxPQUhxQjtBQUkxQlQsSUFBQUEsQ0FBQyxFQUFFQTtBQUp1QixHQUE1QjtBQU1EOztBQUNELFNBQVNGLGdCQUFULEdBQTRCLENBRTNCOztBQUNELFNBQVNDLGFBQVQsR0FBeUIsQ0FFeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2RlbHRhLmRpc3BhdGNoZXInO1xyXG5sZXQgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5sZXQgc3RhcnRYID0gMDtcclxubGV0IHN0YXJ0WSA9IDA7XHJcbmxldCBjdXJyZW50WCA9IDA7XHJcbmxldCBjdXJyZW50WSA9IDA7XHJcbmxldCBzaGlmdFggPSAwO1xyXG5sZXQgc2hpZnRZID0gMDtcclxubGV0IF90aGlzID0gbnVsbDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZEV2ZW50KHNlbGYsIHRhcmdldCkge1xyXG4gIGlmICghKHNlbGYgaW5zdGFuY2VvZiBEaXNwYXRjaGVyKSkge1xyXG4gICAgdGhyb3cgJ3NlbGYgcGFyYW0gbXVzdCBiZSBpbnN0YW5jZSBvZiBEaXNwYXRjaGVyLic7XHJcbiAgfVxyXG4gIGlmICghdGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xyXG4gIH1cclxuICBfdGhpcyA9IHNlbGY7XHJcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF9tb3VzZURvd25IYW5kbGVyKTtcclxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX21vdXNlTW92ZUhhbmRsZXIpO1xyXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgX21vdXNlVXBIYW5kbGVyKTtcclxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIF9tb3VzZVdoZWVsSGFuZGxlcik7XHJcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgX2RibENsaWNrSGFuZGxlcik7XHJcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NsaWNrSGFuZGxlcik7XHJcbn1cclxuZnVuY3Rpb24gX21vdXNlRG93bkhhbmRsZXIoZSkge1xyXG5cclxufVxyXG5mdW5jdGlvbiBfbW91c2VNb3ZlSGFuZGxlcihlKSB7XHJcblxyXG59XHJcbmZ1bmN0aW9uIF9tb3VzZVVwSGFuZGxlcihlKSB7XHJcblxyXG59XHJcbmZ1bmN0aW9uIF9tb3VzZVdoZWVsSGFuZGxlcihlKSB7XHJcbiAgbGV0IGRlbHRhID0gKGUud2hlZWxEZWx0YSAhPT0gdW5kZWZpbmVkICYmIGUud2hlZWxEZWx0YSkgfHxcclxuICAgICAgKGUuZGV0YWlsICE9PSB1bmRlZmluZWQgJiYgLWUuZGV0YWlsKTtcclxuICBfdGhpcy5kaXNwYXRjaEV2ZW50KCd6b29tJywge1xyXG4gICAgZGVsdGE6IGRlbHRhLFxyXG4gICAgeDogZS5vZmZzZXRYLFxyXG4gICAgeTogZS5vZmZzZXRZLFxyXG4gICAgZTogZVxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIF9kYmxDbGlja0hhbmRsZXIoKSB7XHJcblxyXG59XHJcbmZ1bmN0aW9uIF9jbGlja0hhbmRsZXIoKSB7XHJcblxyXG59XHJcbiJdfQ==
},{"./delta.dispatcher":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Interaction =
/*#__PURE__*/
function () {
  function Interaction(deltaInst) {
    _classCallCheck(this, Interaction);

    this.deltaInst = deltaInst;
    this.addInteraction();
  }

  _createClass(Interaction, [{
    key: "addInteraction",
    value: function addInteraction() {
      var delta = this.deltaInst;
      delta.bind('zoom', function (data) {
        delta._transform.scale.forEach(function (s, i) {
          delta._transform.scale[i] *= data.delta > 0 ? 2 : 1 / 2;
        });

        var offsetX = data.x - delta._transform.translate[0];
        var offsetY = data.y - delta._transform.translate[1];
        delta._transform.translate[0] += -(data.delta > 0 ? 1 : -1 / 2) * offsetX;
        delta._transform.translate[1] -= (data.delta > 0 ? 1 : -1 / 2) * offsetY;
        delta.refreshAll();
      });
    }
  }]);

  return Interaction;
}();

exports.default = Interaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLmludGVyYWN0aW9uLmpzIl0sIm5hbWVzIjpbIkludGVyYWN0aW9uIiwiZGVsdGFJbnN0IiwiYWRkSW50ZXJhY3Rpb24iLCJkZWx0YSIsImJpbmQiLCJkYXRhIiwiX3RyYW5zZm9ybSIsInNjYWxlIiwiZm9yRWFjaCIsInMiLCJpIiwib2Zmc2V0WCIsIngiLCJ0cmFuc2xhdGUiLCJvZmZzZXRZIiwieSIsInJlZnJlc2hBbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLFc7OztBQUNuQix1QkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLGNBQUw7QUFDRDs7OztxQ0FDZ0I7QUFDZixVQUFJQyxLQUFLLEdBQUcsS0FBS0YsU0FBakI7QUFDQUUsTUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsTUFBWCxFQUFtQixVQUFDQyxJQUFELEVBQVU7QUFDM0JGLFFBQUFBLEtBQUssQ0FBQ0csVUFBTixDQUFpQkMsS0FBakIsQ0FBdUJDLE9BQXZCLENBQStCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3ZDUCxVQUFBQSxLQUFLLENBQUNHLFVBQU4sQ0FBaUJDLEtBQWpCLENBQXVCRyxDQUF2QixLQUE2QkwsSUFBSSxDQUFDRixLQUFMLEdBQWEsQ0FBYixHQUFnQixDQUFoQixHQUFvQixJQUFFLENBQW5EO0FBQ0QsU0FGRDs7QUFHQSxZQUFJUSxPQUFPLEdBQUdOLElBQUksQ0FBQ08sQ0FBTCxHQUFTVCxLQUFLLENBQUNHLFVBQU4sQ0FBaUJPLFNBQWpCLENBQTJCLENBQTNCLENBQXZCO0FBQ0EsWUFBSUMsT0FBTyxHQUFHVCxJQUFJLENBQUNVLENBQUwsR0FBU1osS0FBSyxDQUFDRyxVQUFOLENBQWlCTyxTQUFqQixDQUEyQixDQUEzQixDQUF2QjtBQUNBVixRQUFBQSxLQUFLLENBQUNHLFVBQU4sQ0FBaUJPLFNBQWpCLENBQTJCLENBQTNCLEtBQWlDLEVBQUVSLElBQUksQ0FBQ0YsS0FBTCxHQUFhLENBQWIsR0FBZ0IsQ0FBaEIsR0FBb0IsQ0FBQyxDQUFELEdBQUcsQ0FBekIsSUFBNEJRLE9BQTdEO0FBQ0FSLFFBQUFBLEtBQUssQ0FBQ0csVUFBTixDQUFpQk8sU0FBakIsQ0FBMkIsQ0FBM0IsS0FBa0MsQ0FBQ1IsSUFBSSxDQUFDRixLQUFMLEdBQWEsQ0FBYixHQUFnQixDQUFoQixHQUFvQixDQUFDLENBQUQsR0FBRyxDQUF4QixJQUEyQlcsT0FBN0Q7QUFDQVgsUUFBQUEsS0FBSyxDQUFDYSxVQUFOO0FBQ0QsT0FURDtBQVVEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGRlbHRhSW5zdCkge1xyXG4gICAgdGhpcy5kZWx0YUluc3QgPSBkZWx0YUluc3Q7XHJcbiAgICB0aGlzLmFkZEludGVyYWN0aW9uKCk7XHJcbiAgfVxyXG4gIGFkZEludGVyYWN0aW9uKCkge1xyXG4gICAgbGV0IGRlbHRhID0gdGhpcy5kZWx0YUluc3Q7XHJcbiAgICBkZWx0YS5iaW5kKCd6b29tJywgKGRhdGEpID0+IHtcclxuICAgICAgZGVsdGEuX3RyYW5zZm9ybS5zY2FsZS5mb3JFYWNoKChzLCBpKSA9PiB7XHJcbiAgICAgICAgZGVsdGEuX3RyYW5zZm9ybS5zY2FsZVtpXSAqPSBkYXRhLmRlbHRhID4gMD8gMiA6IDEvMjtcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBvZmZzZXRYID0gZGF0YS54IC0gZGVsdGEuX3RyYW5zZm9ybS50cmFuc2xhdGVbMF07XHJcbiAgICAgIGxldCBvZmZzZXRZID0gZGF0YS55IC0gZGVsdGEuX3RyYW5zZm9ybS50cmFuc2xhdGVbMV07XHJcbiAgICAgIGRlbHRhLl90cmFuc2Zvcm0udHJhbnNsYXRlWzBdICs9IC0oZGF0YS5kZWx0YSA+IDA/IDEgOiAtMS8yKSpvZmZzZXRYO1xyXG4gICAgICBkZWx0YS5fdHJhbnNmb3JtLnRyYW5zbGF0ZVsxXSAtPSAgKGRhdGEuZGVsdGEgPiAwPyAxIDogLTEvMikqb2Zmc2V0WTtcclxuICAgICAgZGVsdGEucmVmcmVzaEFsbCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setting;
var settings = {
  lineWidth: 1,
  strokeStyle: "#000",
  fillStyle: "rgba(255,0,0,0.5)"
};

function setting(key, val) {
  if (val) {
    settings[key] = value;
  } else {
    if (typeof key === 'string') {
      return settings[key];
    } else {
      Object.assign(settings, key);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLnNldHRpbmdzLmpzIl0sIm5hbWVzIjpbInNldHRpbmdzIiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJmaWxsU3R5bGUiLCJzZXR0aW5nIiwia2V5IiwidmFsIiwidmFsdWUiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBRztBQUNiQyxFQUFBQSxTQUFTLEVBQUUsQ0FERTtBQUViQyxFQUFBQSxXQUFXLEVBQUUsTUFGQTtBQUdiQyxFQUFBQSxTQUFTLEVBQUU7QUFIRSxDQUFmOztBQUtlLFNBQVNDLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCQyxHQUF0QixFQUEyQjtBQUN4QyxNQUFJQSxHQUFKLEVBQVM7QUFDUE4sSUFBQUEsUUFBUSxDQUFDSyxHQUFELENBQVIsR0FBZ0JFLEtBQWhCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBSSxPQUFPRixHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0IsYUFBT0wsUUFBUSxDQUFDSyxHQUFELENBQWY7QUFDRCxLQUZELE1BRU87QUFDTEcsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNULFFBQWQsRUFBd0JLLEdBQXhCO0FBQ0Q7QUFDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNldHRpbmdzID0ge1xyXG4gIGxpbmVXaWR0aDogMSxcclxuICBzdHJva2VTdHlsZTogXCIjMDAwXCIsXHJcbiAgZmlsbFN0eWxlOiBcInJnYmEoMjU1LDAsMCwwLjUpXCJcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0dGluZyhrZXksIHZhbCkge1xyXG4gIGlmICh2YWwpIHtcclxuICAgIHNldHRpbmdzW2tleV0gPSB2YWx1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzZXR0aW5nc1trZXldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihzZXR0aW5ncywga2V5KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _delta = _interopRequireDefault(require("./utils/delta.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector =
/*#__PURE__*/
function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(that) {
      this.x += that.x;
      this.y += that.y;
      return this;
    }
  }, {
    key: "subtract",
    value: function subtract(that) {
      this.x -= that.x;
      this.y -= that.y;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(that) {
      return this.x * that.x + this.y * that.y;
    }
  }, {
    key: "scale",
    value: function scale(ratio) {
      this.x *= ratio;
      this.y *= ratio;
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var radian = _delta.default.angle2Radian(angle),
          sin = Math.sin(radian),
          cos = Math.cos(radian);

      this.x = this.x * cos - this.y * sin;
      this.y = this.x * sin - this.y * cos;
      return this;
    }
  }], [{
    key: "add",
    value: function add(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
  }, {
    key: "subtract",
    value: function subtract(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
  }]);

  return Vector;
}();

exports.default = Vector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLnZlY3Rvci5qcyJdLCJuYW1lcyI6WyJWZWN0b3IiLCJ4IiwieSIsInRoYXQiLCJyYXRpbyIsImFuZ2xlIiwicmFkaWFuIiwidXRpbHMiLCJhbmdsZTJSYWRpYW4iLCJzaW4iLCJNYXRoIiwiY29zIiwidjEiLCJ2MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0lBRXFCQSxNOzs7QUFDbkIsa0JBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLRCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDRDs7Ozt3QkFDR0MsSSxFQUFNO0FBQ1IsV0FBS0YsQ0FBTCxJQUFVRSxJQUFJLENBQUNGLENBQWY7QUFDQSxXQUFLQyxDQUFMLElBQVVDLElBQUksQ0FBQ0QsQ0FBZjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7NkJBQ1FDLEksRUFBTTtBQUNiLFdBQUtGLENBQUwsSUFBVUUsSUFBSSxDQUFDRixDQUFmO0FBQ0EsV0FBS0MsQ0FBTCxJQUFVQyxJQUFJLENBQUNELENBQWY7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3dCQUNHQyxJLEVBQU07QUFDUixhQUFPLEtBQUtGLENBQUwsR0FBU0UsSUFBSSxDQUFDRixDQUFkLEdBQWtCLEtBQUtDLENBQUwsR0FBU0MsSUFBSSxDQUFDRCxDQUF2QztBQUNEOzs7MEJBT0tFLEssRUFBTztBQUNYLFdBQUtILENBQUwsSUFBVUcsS0FBVjtBQUNBLFdBQUtGLENBQUwsSUFBVUUsS0FBVjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7MkJBQ01DLEssRUFBTztBQUNaLFVBQU1DLE1BQU0sR0FBR0MsZUFBTUMsWUFBTixDQUFtQkgsS0FBbkIsQ0FBZjtBQUFBLFVBQ01JLEdBQUcsR0FBR0MsSUFBSSxDQUFDRCxHQUFMLENBQVNILE1BQVQsQ0FEWjtBQUFBLFVBRU1LLEdBQUcsR0FBR0QsSUFBSSxDQUFDQyxHQUFMLENBQVNMLE1BQVQsQ0FGWjs7QUFHQSxXQUFLTCxDQUFMLEdBQVMsS0FBS0EsQ0FBTCxHQUFTVSxHQUFULEdBQWUsS0FBS1QsQ0FBTCxHQUFTTyxHQUFqQztBQUNBLFdBQUtQLENBQUwsR0FBUyxLQUFLRCxDQUFMLEdBQVNRLEdBQVQsR0FBZSxLQUFLUCxDQUFMLEdBQVNTLEdBQWpDO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt3QkFsQlVDLEUsRUFBSUMsRSxFQUFJO0FBQ2pCLGFBQU8sSUFBSWIsTUFBSixDQUFXWSxFQUFFLENBQUNYLENBQUgsR0FBT1ksRUFBRSxDQUFDWixDQUFyQixFQUF3QlcsRUFBRSxDQUFDVixDQUFILEdBQU9XLEVBQUUsQ0FBQ1gsQ0FBbEMsQ0FBUDtBQUNEOzs7NkJBQ2VVLEUsRUFBSUMsRSxFQUFJO0FBQ3RCLGFBQU8sSUFBSWIsTUFBSixDQUFXWSxFQUFFLENBQUNYLENBQUgsR0FBT1ksRUFBRSxDQUFDWixDQUFyQixFQUF3QlcsRUFBRSxDQUFDVixDQUFILEdBQU9XLEVBQUUsQ0FBQ1gsQ0FBbEMsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvZGVsdGEudXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcbiAgYWRkKHRoYXQpIHtcclxuICAgIHRoaXMueCArPSB0aGF0Lng7XHJcbiAgICB0aGlzLnkgKz0gdGhhdC55O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHN1YnRyYWN0KHRoYXQpIHtcclxuICAgIHRoaXMueCAtPSB0aGF0Lng7XHJcbiAgICB0aGlzLnkgLT0gdGhhdC55O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIGRvdCh0aGF0KSB7XHJcbiAgICByZXR1cm4gdGhpcy54ICogdGhhdC54ICsgdGhpcy55ICogdGhhdC55O1xyXG4gIH1cclxuICBzdGF0aWMgYWRkKHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KTtcclxuICB9XHJcbiAgc3RhdGljIHN1YnRyYWN0KHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodjEueCAtIHYyLngsIHYxLnkgLSB2Mi55KTtcclxuICB9XHJcbiAgc2NhbGUocmF0aW8pIHtcclxuICAgIHRoaXMueCAqPSByYXRpbztcclxuICAgIHRoaXMueSAqPSByYXRpbztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByb3RhdGUoYW5nbGUpIHtcclxuICAgIGNvbnN0IHJhZGlhbiA9IHV0aWxzLmFuZ2xlMlJhZGlhbihhbmdsZSksXHJcbiAgICAgICAgICBzaW4gPSBNYXRoLnNpbihyYWRpYW4pLFxyXG4gICAgICAgICAgY29zID0gTWF0aC5jb3MocmFkaWFuKTtcclxuICAgIHRoaXMueCA9IHRoaXMueCAqIGNvcyAtIHRoaXMueSAqIHNpbjtcclxuICAgIHRoaXMueSA9IHRoaXMueCAqIHNpbiAtIHRoaXMueSAqIGNvcztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iXX0=
},{"./utils/delta.utils":11}],7:[function(require,module,exports){
"use strict";

var _delta = _interopRequireDefault(require("./delta.core"));

var utils = _interopRequireWildcard(require("./utils/delta.utils"));

var _delta3 = _interopRequireDefault(require("./delta.vector"));

var _shapesRegularPolygon = _interopRequireDefault(require("./shapes/shapes.regularPolygon.class"));

var _shapesSector = _interopRequireDefault(require("./shapes/shapes.sector.class"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.delta = {
  Delta: _delta.default,
  utils: utils,
  Vector: _delta3.default,
  RegularPolygon: _shapesRegularPolygon.default,
  Sector: _shapesSector.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiZGVsdGEiLCJEZWx0YSIsInV0aWxzIiwiVmVjdG9yIiwiUmVndWxhclBvbHlnb24iLCJTZWN0b3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBQSxNQUFNLENBQUNDLEtBQVAsR0FBZTtBQUNiQyxFQUFBQSxLQUFLLEVBQUxBLGNBRGE7QUFFYkMsRUFBQUEsS0FBSyxFQUFMQSxLQUZhO0FBR2JDLEVBQUFBLE1BQU0sRUFBTkEsZUFIYTtBQUliQyxFQUFBQSxjQUFjLEVBQWRBLDZCQUphO0FBS2JDLEVBQUFBLE1BQU0sRUFBTkE7QUFMYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlbHRhIGZyb20gJy4vZGVsdGEuY29yZSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvZGVsdGEudXRpbHMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vZGVsdGEudmVjdG9yJztcclxuaW1wb3J0IFJlZ3VsYXJQb2x5Z29uIGZyb20gJy4vc2hhcGVzL3NoYXBlcy5yZWd1bGFyUG9seWdvbi5jbGFzcyc7XHJcbmltcG9ydCBTZWN0b3IgZnJvbSAnLi9zaGFwZXMvc2hhcGVzLnNlY3Rvci5jbGFzcyc7XHJcblxyXG53aW5kb3cuZGVsdGEgPSB7XHJcbiAgRGVsdGEsXHJcbiAgdXRpbHMsXHJcbiAgVmVjdG9yLFxyXG4gIFJlZ3VsYXJQb2x5Z29uLFxyXG4gIFNlY3RvclxyXG59O1xyXG4iXX0=
},{"./delta.core":1,"./delta.vector":6,"./shapes/shapes.regularPolygon.class":9,"./shapes/shapes.sector.class":10,"./utils/delta.utils":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _delta = _interopRequireDefault(require("../delta.settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shape =
/*#__PURE__*/
function () {
  function Shape(option) {
    _classCallCheck(this, Shape);

    Object.assign(this, option);
    this.type = 'shape';
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.fillStyle = option.fillStyle || (0, _delta.default)('fillStyle');
    this.strokeStyle = option.strokeStyle || (0, _delta.default)('strokeStyle');
    this.lineWidth = option.lineWidth || (0, _delta.default)('lineWidth');
  }

  _createClass(Shape, [{
    key: "render",
    value: function render(ctx) {
      console.log('implemented in child class');
    }
  }]);

  return Shape;
}();

exports.default = Shape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXBlcy5vYmplY3QuY2xhc3MuanMiXSwibmFtZXMiOlsiU2hhcGUiLCJvcHRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJ0eXBlIiwieCIsInkiLCJmaWxsU3R5bGUiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImN0eCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztJQUVxQkEsSzs7O0FBQ25CLGlCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixNQUFwQjtBQUNBLFNBQUtHLElBQUwsR0FBWSxPQUFaO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTSixNQUFNLENBQUNJLENBQVAsSUFBWSxDQUFyQjtBQUNBLFNBQUtDLENBQUwsR0FBU0wsTUFBTSxDQUFDSyxDQUFQLElBQVksQ0FBckI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCTixNQUFNLENBQUNNLFNBQVAsSUFBb0Isb0JBQVMsV0FBVCxDQUFyQztBQUNBLFNBQUtDLFdBQUwsR0FBbUJQLE1BQU0sQ0FBQ08sV0FBUCxJQUFzQixvQkFBUyxhQUFULENBQXpDO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQlIsTUFBTSxDQUFDUSxTQUFQLElBQW9CLG9CQUFTLFdBQVQsQ0FBckM7QUFDRDs7OzsyQkFDTUMsRyxFQUFLO0FBQ1ZDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vZGVsdGEuc2V0dGluZ3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb24pO1xyXG4gICAgdGhpcy50eXBlID0gJ3NoYXBlJztcclxuICAgIHRoaXMueCA9IG9wdGlvbi54IHx8IDA7XHJcbiAgICB0aGlzLnkgPSBvcHRpb24ueSB8fCAwO1xyXG4gICAgdGhpcy5maWxsU3R5bGUgPSBvcHRpb24uZmlsbFN0eWxlIHx8IHNldHRpbmdzKCdmaWxsU3R5bGUnKTtcclxuICAgIHRoaXMuc3Ryb2tlU3R5bGUgPSBvcHRpb24uc3Ryb2tlU3R5bGUgfHwgc2V0dGluZ3MoJ3N0cm9rZVN0eWxlJyk7XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IG9wdGlvbi5saW5lV2lkdGggfHwgc2V0dGluZ3MoJ2xpbmVXaWR0aCcpO1xyXG4gIH1cclxuICByZW5kZXIoY3R4KSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW1wbGVtZW50ZWQgaW4gY2hpbGQgY2xhc3MnKTtcclxuICB9XHJcbn1cclxuIl19
},{"../delta.settings":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shapesObject = _interopRequireDefault(require("./shapes.object.class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RegularPolygon =
/*#__PURE__*/
function (_Shape) {
  _inherits(RegularPolygon, _Shape);

  function RegularPolygon(option) {
    var _this;

    _classCallCheck(this, RegularPolygon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegularPolygon).call(this, option));
    _this.type = 'regular-polygon';
    return _this;
  }

  _createClass(RegularPolygon, [{
    key: "getCenter",
    value: function getCenter() {
      if (!this.x && this.x !== 0 || !this.y && this.y !== 0) {
        throw "x or y property is required!";
      }

      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.size || 20;
    }
  }, {
    key: "getPoints",
    value: function getPoints() {
      var points = [],
          center = this.getCenter(),
          startAngle = this.startAngle || 0,
          size = this.getSize(),
          sides = this.sides || 3,
          angleStep = Math.PI * 2 / sides;

      for (var i = 0; i < sides; i++) {
        points.push({
          x: center.x + size * Math.cos(startAngle),
          y: center.y + size * Math.sin(startAngle)
        });
        startAngle += angleStep;
      }

      return points;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      var points = this.getPoints();
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
  }]);

  return RegularPolygon;
}(_shapesObject.default);

exports.default = RegularPolygon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXBlcy5yZWd1bGFyUG9seWdvbi5jbGFzcy5qcyJdLCJuYW1lcyI6WyJSZWd1bGFyUG9seWdvbiIsIm9wdGlvbiIsInR5cGUiLCJ4IiwieSIsInNpemUiLCJwb2ludHMiLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJzdGFydEFuZ2xlIiwiZ2V0U2l6ZSIsInNpZGVzIiwiYW5nbGVTdGVwIiwiTWF0aCIsIlBJIiwiaSIsInB1c2giLCJjb3MiLCJzaW4iLCJjdHgiLCJnZXRQb2ludHMiLCJmaWxsU3R5bGUiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxlbiIsImxlbmd0aCIsImxpbmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsImZpbGwiLCJTaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7OztBQUNuQiwwQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUNsQix3RkFBTUEsTUFBTjtBQUNBLFVBQUtDLElBQUwsR0FBWSxpQkFBWjtBQUZrQjtBQUduQjs7OztnQ0FDVztBQUNWLFVBQUksQ0FBQyxLQUFLQyxDQUFOLElBQVcsS0FBS0EsQ0FBTCxLQUFXLENBQXRCLElBQTJCLENBQUMsS0FBS0MsQ0FBTixJQUFXLEtBQUtBLENBQUwsS0FBVyxDQUFyRCxFQUF3RDtBQUN0RCxjQUFNLDhCQUFOO0FBQ0Q7O0FBQ0QsYUFBTztBQUNMRCxRQUFBQSxDQUFDLEVBQUUsS0FBS0EsQ0FESDtBQUVMQyxRQUFBQSxDQUFDLEVBQUUsS0FBS0E7QUFGSCxPQUFQO0FBSUQ7Ozs4QkFDUztBQUNSLGFBQU8sS0FBS0MsSUFBTCxJQUFhLEVBQXBCO0FBQ0Q7OztnQ0FDVztBQUNWLFVBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQUEsVUFDSUMsTUFBTSxHQUFHLEtBQUtDLFNBQUwsRUFEYjtBQUFBLFVBRUlDLFVBQVUsR0FBRyxLQUFLQSxVQUFMLElBQW1CLENBRnBDO0FBQUEsVUFHSUosSUFBSSxHQUFHLEtBQUtLLE9BQUwsRUFIWDtBQUFBLFVBSUlDLEtBQUssR0FBRyxLQUFLQSxLQUFMLElBQWMsQ0FKMUI7QUFBQSxVQUtJQyxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQVYsR0FBY0gsS0FMOUI7O0FBTUEsV0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixLQUFwQixFQUEyQkksQ0FBQyxFQUE1QixFQUFnQztBQUM5QlQsUUFBQUEsTUFBTSxDQUFDVSxJQUFQLENBQVk7QUFDVmIsVUFBQUEsQ0FBQyxFQUFFSSxNQUFNLENBQUNKLENBQVAsR0FBV0UsSUFBSSxHQUFHUSxJQUFJLENBQUNJLEdBQUwsQ0FBU1IsVUFBVCxDQURYO0FBRVZMLFVBQUFBLENBQUMsRUFBRUcsTUFBTSxDQUFDSCxDQUFQLEdBQVdDLElBQUksR0FBR1EsSUFBSSxDQUFDSyxHQUFMLENBQVNULFVBQVQ7QUFGWCxTQUFaO0FBSUFBLFFBQUFBLFVBQVUsSUFBSUcsU0FBZDtBQUNEOztBQUNELGFBQU9OLE1BQVA7QUFDRDs7OzJCQUNNYSxHLEVBQUs7QUFDVixVQUFJYixNQUFNLEdBQUcsS0FBS2MsU0FBTCxFQUFiO0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ0UsU0FBSixHQUFnQixLQUFLQSxTQUFyQjtBQUNBRixNQUFBQSxHQUFHLENBQUNHLFdBQUosR0FBa0IsS0FBS0EsV0FBdkI7QUFDQUgsTUFBQUEsR0FBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUtBLFNBQXJCO0FBQ0FKLE1BQUFBLEdBQUcsQ0FBQ0ssU0FBSjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBV25CLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVUgsQ0FBckIsRUFBd0JHLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVUYsQ0FBbEM7O0FBQ0EsV0FBSyxJQUFJVyxDQUFDLEdBQUcsQ0FBUixFQUFXVyxHQUFHLEdBQUdwQixNQUFNLENBQUNxQixNQUE3QixFQUFxQ1osQ0FBQyxHQUFHVyxHQUF6QyxFQUE4Q1gsQ0FBQyxFQUEvQyxFQUFtRDtBQUNqREksUUFBQUEsR0FBRyxDQUFDUyxNQUFKLENBQVd0QixNQUFNLENBQUNTLENBQUQsQ0FBTixDQUFVWixDQUFyQixFQUF3QkcsTUFBTSxDQUFDUyxDQUFELENBQU4sQ0FBVVgsQ0FBbEM7QUFDRDs7QUFDRGUsTUFBQUEsR0FBRyxDQUFDVSxTQUFKO0FBQ0FWLE1BQUFBLEdBQUcsQ0FBQ1csTUFBSjtBQUNBWCxNQUFBQSxHQUFHLENBQUNZLElBQUo7QUFDRDs7OztFQTlDeUNDLHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoYXBlIGZyb20gJy4vc2hhcGVzLm9iamVjdC5jbGFzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWd1bGFyUG9seWdvbiBleHRlbmRzIFNoYXBlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgIHN1cGVyKG9wdGlvbik7XHJcbiAgICB0aGlzLnR5cGUgPSAncmVndWxhci1wb2x5Z29uJztcclxuICB9XHJcbiAgZ2V0Q2VudGVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnggJiYgdGhpcy54ICE9PSAwIHx8ICF0aGlzLnkgJiYgdGhpcy55ICE9PSAwKSB7XHJcbiAgICAgIHRocm93IFwieCBvciB5IHByb3BlcnR5IGlzIHJlcXVpcmVkIVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnlcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0U2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNpemUgfHwgMjA7XHJcbiAgfVxyXG4gIGdldFBvaW50cygpIHtcclxuICAgIGxldCBwb2ludHMgPSBbXSxcclxuICAgICAgICBjZW50ZXIgPSB0aGlzLmdldENlbnRlcigpLFxyXG4gICAgICAgIHN0YXJ0QW5nbGUgPSB0aGlzLnN0YXJ0QW5nbGUgfHwgMCxcclxuICAgICAgICBzaXplID0gdGhpcy5nZXRTaXplKCksXHJcbiAgICAgICAgc2lkZXMgPSB0aGlzLnNpZGVzIHx8IDMsXHJcbiAgICAgICAgYW5nbGVTdGVwID0gTWF0aC5QSSAqIDIgLyBzaWRlcztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lkZXM7IGkrKykge1xyXG4gICAgICBwb2ludHMucHVzaCh7XHJcbiAgICAgICAgeDogY2VudGVyLnggKyBzaXplICogTWF0aC5jb3Moc3RhcnRBbmdsZSksXHJcbiAgICAgICAgeTogY2VudGVyLnkgKyBzaXplICogTWF0aC5zaW4oc3RhcnRBbmdsZSlcclxuICAgICAgfSk7XHJcbiAgICAgIHN0YXJ0QW5nbGUgKz0gYW5nbGVTdGVwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxuICB9XHJcbiAgcmVuZGVyKGN0eCkge1xyXG4gICAgbGV0IHBvaW50cyA9IHRoaXMuZ2V0UG9pbnRzKCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZVN0eWxlO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyhwb2ludHNbMF0ueCwgcG9pbnRzWzBdLnkpO1xyXG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjdHgubGluZVRvKHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XHJcbiAgICB9XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG4iXX0=
},{"./shapes.object.class":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shapesObject = _interopRequireDefault(require("./shapes.object.class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sector =
/*#__PURE__*/
function (_Shape) {
  _inherits(Sector, _Shape);

  function Sector(option) {
    var _this;

    _classCallCheck(this, Sector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sector).call(this, option));
    _this.type = 'sector';
    _this.radius = option.radius || 20;
    _this.startAngle = option.startAngle || 0;
    _this.endAngle = option.endAngle || Math.PI * 2;
    _this.clockwise = option.clockwise || true;
    return _this;
  }

  _createClass(Sector, [{
    key: "render",
    value: function render(ctx) {
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.beginPath();

      if (Math.abs(this.endAngle - this.startAngle - Math.PI * 2) < 0.001) {
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, !this.clockwise);
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, !this.clockwise);
      }

      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }]);

  return Sector;
}(_shapesObject.default);

exports.default = Sector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXBlcy5zZWN0b3IuY2xhc3MuanMiXSwibmFtZXMiOlsiU2VjdG9yIiwib3B0aW9uIiwidHlwZSIsInJhZGl1cyIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsIk1hdGgiLCJQSSIsImNsb2Nrd2lzZSIsImN0eCIsImZpbGxTdHlsZSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiYmVnaW5QYXRoIiwiYWJzIiwiYXJjIiwieCIsInkiLCJtb3ZlVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJmaWxsIiwiU2hhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7QUFDbkIsa0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDbEIsZ0ZBQU1BLE1BQU47QUFDQSxVQUFLQyxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUtDLE1BQUwsR0FBY0YsTUFBTSxDQUFDRSxNQUFQLElBQWlCLEVBQS9CO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQkgsTUFBTSxDQUFDRyxVQUFQLElBQXFCLENBQXZDO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQkosTUFBTSxDQUFDSSxRQUFQLElBQW1CQyxJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUE3QztBQUNBLFVBQUtDLFNBQUwsR0FBaUJQLE1BQU0sQ0FBQ08sU0FBUCxJQUFvQixJQUFyQztBQU5rQjtBQU9uQjs7OzsyQkFFTUMsRyxFQUFLO0FBQ1ZBLE1BQUFBLEdBQUcsQ0FBQ0MsU0FBSixHQUFnQixLQUFLQSxTQUFyQjtBQUNBRCxNQUFBQSxHQUFHLENBQUNFLFdBQUosR0FBa0IsS0FBS0EsV0FBdkI7QUFDQUYsTUFBQUEsR0FBRyxDQUFDRyxTQUFKLEdBQWdCLEtBQUtBLFNBQXJCO0FBQ0FILE1BQUFBLEdBQUcsQ0FBQ0ksU0FBSjs7QUFDQSxVQUFJUCxJQUFJLENBQUNRLEdBQUwsQ0FBUyxLQUFLVCxRQUFMLEdBQWdCLEtBQUtELFVBQXJCLEdBQWtDRSxJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUFyRCxJQUEwRCxLQUE5RCxFQUFxRTtBQUNuRUUsUUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVEsS0FBS0MsQ0FBYixFQUFnQixLQUFLQyxDQUFyQixFQUF3QixLQUFLZCxNQUE3QixFQUNRLEtBQUtDLFVBRGIsRUFDeUIsS0FBS0MsUUFEOUIsRUFDd0MsQ0FBQyxLQUFLRyxTQUQ5QztBQUVELE9BSEQsTUFHTztBQUNMQyxRQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxLQUFLRixDQUFoQixFQUFtQixLQUFLQyxDQUF4QjtBQUNBUixRQUFBQSxHQUFHLENBQUNNLEdBQUosQ0FBUSxLQUFLQyxDQUFiLEVBQWdCLEtBQUtDLENBQXJCLEVBQXdCLEtBQUtkLE1BQTdCLEVBQ1EsS0FBS0MsVUFEYixFQUN5QixLQUFLQyxRQUQ5QixFQUN3QyxDQUFDLEtBQUtHLFNBRDlDO0FBRUQ7O0FBQ0RDLE1BQUFBLEdBQUcsQ0FBQ1UsU0FBSjtBQUNBVixNQUFBQSxHQUFHLENBQUNXLE1BQUo7QUFDQVgsTUFBQUEsR0FBRyxDQUFDWSxJQUFKO0FBQ0Q7Ozs7RUExQmlDQyxxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFwZSBmcm9tICcuL3NoYXBlcy5vYmplY3QuY2xhc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdG9yIGV4dGVuZHMgU2hhcGUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbikge1xyXG4gICAgc3VwZXIob3B0aW9uKTtcclxuICAgIHRoaXMudHlwZSA9ICdzZWN0b3InO1xyXG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb24ucmFkaXVzIHx8IDIwO1xyXG4gICAgdGhpcy5zdGFydEFuZ2xlID0gb3B0aW9uLnN0YXJ0QW5nbGUgfHwgMDtcclxuICAgIHRoaXMuZW5kQW5nbGUgPSBvcHRpb24uZW5kQW5nbGUgfHwgTWF0aC5QSSAqIDI7XHJcbiAgICB0aGlzLmNsb2Nrd2lzZSA9IG9wdGlvbi5jbG9ja3dpc2UgfHwgdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcihjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlU3R5bGU7XHJcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBpZiAoTWF0aC5hYnModGhpcy5lbmRBbmdsZSAtIHRoaXMuc3RhcnRBbmdsZSAtIE1hdGguUEkgKiAyKSA8IDAuMDAxKSB7XHJcbiAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLFxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmdsZSwgdGhpcy5lbmRBbmdsZSwgIXRoaXMuY2xvY2t3aXNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cyxcclxuICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5nbGUsIHRoaXMuZW5kQW5nbGUsICF0aGlzLmNsb2Nrd2lzZSk7XHJcbiAgICB9XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG4iXX0=
},{"./shapes.object.class":8}],11:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawGrid = drawGrid;
exports.drawRect = drawRect;
exports.pkg = pkg;
exports.angle2Radian = angle2Radian;
exports.radian2Angle = radian2Angle;
exports.getScaleMatrix = getScaleMatrix;
exports.getRotateMatrix = getRotateMatrix;
exports.getTranslateMatrix = getTranslateMatrix;
exports.multiplyMatrix = multiplyMatrix;

/**
* 为canvas添加辅助的绘图网格
*/
function drawGrid(ctx) {
  var xspacing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var yspacing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#CCC';
  var WIDTH = ctx.canvas.width;
  var HEIGHT = ctx.canvas.height;
  var HORIZONTAL_NUMS = HEIGHT / yspacing;
  var VERTICAL_NUMS = WIDTH / xspacing;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.setLineDash = [1, 1];
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  for (var i = 0; i < HORIZONTAL_NUMS; i++) {
    ctx.moveTo(0, xspacing * i + 0.5);
    ctx.lineTo(WIDTH, xspacing * i + 0.5);
  }

  for (var _i = 0; _i < VERTICAL_NUMS; _i++) {
    ctx.moveTo(yspacing * _i + 0.5, 0);
    ctx.lineTo(yspacing * _i + 0.5, HEIGHT);
  }

  ctx.stroke();
  ctx.restore();
}
/**
* 绘制矩形,可设置圆角
*/


function drawRect(ctx, x, y, width, height) {
  var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
}
/**
* 创建指定的命名空间
*/


function pkg(path) {
  var paths = path.split('.');
  paths.reduce(function (path, name) {
    if (!path[name]) {
      path[name] = {};
    }

    return path[name];
  }, global);
}

function angle2Radian(angle) {
  return angle / 180 * Math.PI;
}

function radian2Angle(radian) {
  return 180 / Math.PI * radian;
}

function getScaleMatrix(scaleX, sy) {
  var scaleY = sy || scaleX;
  return [[scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]];
}

function getRotateMatrix(angle) {
  return [[Math.cos(angle), Math.sin(angle), 0], [-Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]];
}

function getTranslateMatrix(translate) {
  return [[1, 0, translate[0]], [0, 1, translate[1]], [0, 0, 1]];
}

function multiplyMatrix(m1, m2) {
  if (m1[0].length !== m2.length) {
    throw 'invalid arguments';
  }

  var result = [];
  var rows = m1.length,
      cols = m2[0].length;

  for (var i = 0; i < rows; i++) {
    var _loop = function _loop(j) {
      if (!result[i]) {
        result[i] = [];
      }

      result[i][j] = m1[i].reduce(function (sum, num, index) {
        sum += num * m2[index][j];
        return sum;
      }, 0);
    };

    for (var j = 0; j < cols; j++) {
      _loop(j);
    }
  }

  return result;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHRhLnV0aWxzLmpzIl0sIm5hbWVzIjpbImRyYXdHcmlkIiwiY3R4IiwieHNwYWNpbmciLCJ5c3BhY2luZyIsImNvbG9yIiwiV0lEVEgiLCJjYW52YXMiLCJ3aWR0aCIsIkhFSUdIVCIsImhlaWdodCIsIkhPUklaT05UQUxfTlVNUyIsIlZFUlRJQ0FMX05VTVMiLCJzYXZlIiwic3Ryb2tlU3R5bGUiLCJzZXRMaW5lRGFzaCIsImxpbmVXaWR0aCIsImJlZ2luUGF0aCIsImkiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJyZXN0b3JlIiwiZHJhd1JlY3QiLCJ4IiwieSIsInIiLCJwa2ciLCJwYXRoIiwicGF0aHMiLCJzcGxpdCIsInJlZHVjZSIsIm5hbWUiLCJnbG9iYWwiLCJhbmdsZTJSYWRpYW4iLCJhbmdsZSIsIk1hdGgiLCJQSSIsInJhZGlhbjJBbmdsZSIsInJhZGlhbiIsImdldFNjYWxlTWF0cml4Iiwic2NhbGVYIiwic3kiLCJzY2FsZVkiLCJnZXRSb3RhdGVNYXRyaXgiLCJjb3MiLCJzaW4iLCJnZXRUcmFuc2xhdGVNYXRyaXgiLCJ0cmFuc2xhdGUiLCJtdWx0aXBseU1hdHJpeCIsIm0xIiwibTIiLCJsZW5ndGgiLCJyZXN1bHQiLCJyb3dzIiwiY29scyIsImoiLCJzdW0iLCJudW0iLCJpbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUdBLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXFFO0FBQUEsTUFBOUNDLFFBQThDLHVFQUFuQyxFQUFtQztBQUFBLE1BQS9CQyxRQUErQix1RUFBcEIsRUFBb0I7QUFBQSxNQUFoQkMsS0FBZ0IsdUVBQVIsTUFBUTtBQUNuRSxNQUFNQyxLQUFLLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBSixDQUFXQyxLQUF6QjtBQUNBLE1BQU1DLE1BQU0sR0FBR1AsR0FBRyxDQUFDSyxNQUFKLENBQVdHLE1BQTFCO0FBQ0EsTUFBTUMsZUFBZSxHQUFHRixNQUFNLEdBQUdMLFFBQWpDO0FB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QUQsRUFBTUMsR0FBTixFQUFXQyxLQUFYLEVBQXFCO0FBQy9DRixRQUFBQSxHQUFHLElBQUlDLEdBQUcsR0FBR1AsRUFBRSxDQUFDUSxLQUFELENBQUYsQ0FBVUgsQ0FBVixDQUFiO0FBQ0EsZUFBT0MsR0FBUDtBQUNELE9BSGMsRUFHWixDQUhZLENBQWY7QUFMMkI7O0FBQzdCLFNBQUssSUFBSUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsSUFBcEIsRUFBMEJDLENBQUMsRUFBM0IsRUFBK0I7QUFBQSxZQUF0QkEsQ0FBc0I7QUFROUI7QUFDRjs7QUFDRCxTQUFPSCxNQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiog5Li6Y2FudmFz5re75Yqg6L6F5Yqp55qE57uY5Zu+572R5qC8XHJcbiovXHJcbmZ1bmN0aW9uIGRyYXdHcmlkKGN0eCwgeHNwYWNpbmcgPSAxMCwgeXNwYWNpbmcgPSAxMCwgY29sb3IgPSAnI0NDQycpIHtcclxuICBjb25zdCBXSURUSCA9IGN0eC5jYW52YXMud2lkdGg7XHJcbiAgY29uc3QgSEVJR0hUID0gY3R4LmNhbnZhcy5oZWlnaHQ7XHJcbiAgY29uc3QgSE9SSVpPTlRBTF9OVU1TID0gSEVJR0hUIC8geXNwYWNpbmc7XHJcbiAgY29uc3QgVkVSVElDQUxfTlVNUyA9IFdJRFRIIC8geHNwYWNpbmc7XHJcbiAgY3R4LnNhdmUoKTtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICBjdHguc2V0TGluZURhc2ggPSBbMSwgMV07XHJcbiAgY3R4LmxpbmVXaWR0aCA9IDAuNTtcclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBIT1JJWk9OVEFMX05VTVM7IGkrKykge1xyXG4gICAgY3R4Lm1vdmVUbygwLCB4c3BhY2luZyAqIGkgKyAwLjUpO1xyXG4gICAgY3R4LmxpbmVUbyhXSURUSCwgeHNwYWNpbmcgKiBpICsgMC41KTtcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBWRVJUSUNBTF9OVU1TOyBpKyspIHtcclxuICAgIGN0eC5tb3ZlVG8oeXNwYWNpbmcgKiBpICsgMC41LCAwKTtcclxuICAgIGN0eC5saW5lVG8oeXNwYWNpbmcgKiBpICsgMC41LCBIRUlHSFQpO1xyXG4gIH1cclxuICBjdHguc3Ryb2tlKCk7XHJcbiAgY3R4LnJlc3RvcmUoKTtcclxufVxyXG4vKipcclxuKiDnu5jliLbnn6nlvaIs5Y+v6K6+572u5ZyG6KeSXHJcbiovXHJcbmZ1bmN0aW9uIGRyYXdSZWN0KGN0eCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgciA9IDApIHtcclxuXHJcbn1cclxuLyoqXHJcbiog5Yib5bu65oyH5a6a55qE5ZG95ZCN56m66Ze0XHJcbiovXHJcbmZ1bmN0aW9uIHBrZyhwYXRoKSB7XHJcbiAgbGV0IHBhdGhzID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gIHBhdGhzLnJlZHVjZSggKHBhdGgsIG5hbWUpID0+IHtcclxuICAgIGlmICghcGF0aFtuYW1lXSkge1xyXG4gICAgICBwYXRoW25hbWVdID0ge307XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aFtuYW1lXTtcclxuICB9LCBnbG9iYWwpO1xyXG59XHJcbmZ1bmN0aW9uIGFuZ2xlMlJhZGlhbihhbmdsZSkge1xyXG4gIHJldHVybiBhbmdsZSAvIDE4MCAqIE1hdGguUEk7XHJcbn1cclxuZnVuY3Rpb24gcmFkaWFuMkFuZ2xlKHJhZGlhbikge1xyXG4gIHJldHVybiAxODAgLyBNYXRoLlBJICogcmFkaWFuO1xyXG59XHJcbmZ1bmN0aW9uIGdldFNjYWxlTWF0cml4KHNjYWxlWCwgc3kpIHtcclxuICBsZXQgc2NhbGVZID0gc3kgfHwgc2NhbGVYO1xyXG4gIHJldHVybiBbXHJcbiAgICBbc2NhbGVYLCAwLCAwXSxcclxuICAgIFswLCBzY2FsZVksIDBdLFxyXG4gICAgWzAsICAgICAgMCwgMV1cclxuICBdO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJvdGF0ZU1hdHJpeChhbmdsZSkge1xyXG4gIHJldHVybiBbXHJcbiAgICBbIE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpLCAwXSxcclxuICAgIFstTWF0aC5zaW4oYW5nbGUpLCBNYXRoLmNvcyhhbmdsZSksIDBdLFxyXG4gICAgWzAsICAgICAgMCwgMV1cclxuICBdO1xyXG59XHJcbmZ1bmN0aW9uIGdldFRyYW5zbGF0ZU1hdHJpeCh0cmFuc2xhdGUpIHtcclxuICByZXR1cm4gW1xyXG4gICAgWzEsIDAsIHRyYW5zbGF0ZVswXV0sXHJcbiAgICBbMCwgMSwgdHJhbnNsYXRlWzFdXSxcclxuICAgIFswLCAwLCAgICAgICAgICAgIDFdXHJcbiAgXTtcclxufVxyXG5mdW5jdGlvbiBtdWx0aXBseU1hdHJpeChtMSwgbTIpIHtcclxuICBpZiAobTFbMF0ubGVuZ3RoICE9PSBtMi5sZW5ndGgpIHtcclxuICAgIHRocm93ICdpbnZhbGlkIGFyZ3VtZW50cyc7XHJcbiAgfVxyXG4gIGxldCByZXN1bHQgPSBbXTtcclxuICBsZXQgcm93cyA9IG0xLmxlbmd0aCxcclxuICAgICAgY29scyA9IG0yWzBdLmxlbmd0aDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgaWYgKCFyZXN1bHRbaV0pIHtcclxuICAgICAgICByZXN1bHRbaV0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICByZXN1bHRbaV1bal0gPSBtMVtpXS5yZWR1Y2UoKHN1bSwgbnVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHN1bSArPSBudW0gKiBtMltpbmRleF1bal07XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZXhwb3J0IHtkcmF3R3JpZCxcclxuICAgICAgICBkcmF3UmVjdCxcclxuICAgICAgICBwa2csXHJcbiAgICAgICAgYW5nbGUyUmFkaWFuLFxyXG4gICAgICAgIHJhZGlhbjJBbmdsZSxcclxuICAgICAgICBnZXRTY2FsZU1hdHJpeCxcclxuICAgICAgICBnZXRSb3RhdGVNYXRyaXgsXHJcbiAgICAgICAgZ2V0VHJhbnNsYXRlTWF0cml4LFxyXG4gICAgICAgIG11bHRpcGx5TWF0cml4XHJcbiAgICAgIH07XHJcbiJdfQ==
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[7])
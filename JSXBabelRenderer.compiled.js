"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.reduce = reduce;
exports.generate = generate;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function reduce(element) {
  var _executedElement$prop;

  if (typeof element === 'string') {
    return _react2.default.createElement("string", null, element);
  }

  var executedElement = void 0;

  if (typeof element.type === 'function') {
    executedElement = element.type(element.props);
  } else if (typeof element.type === 'string') {
    executedElement = element;
  }

  var reducedChildren = (_executedElement$prop = executedElement.props.children) == null ? void 0 : _executedElement$prop.map(reduce);
  return _extends({}, executedElement, {
    props: _extends({}, executedElement.props, {
      children: reducedChildren
    })
  });
}

function generate(element) {
  var _element$props$childr;

  return BasicElements[element.type](element, (_element$props$childr = element.props.children) == null ? void 0 : _element$props$childr.map(generate));
}

var render = function render(element) {
  return generate(reduce(element));
};

var BasicElements = function BasicElements() {
  _classCallCheck(this, BasicElements);
};


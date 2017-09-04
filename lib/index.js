"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.reduce = reduce;
exports.flatten = flatten;
exports.generateAST = generateAST;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function reduce(element) {
  if (element instanceof RegExp) {
    return _react2.default.createElement("regExp", {
      value: element
    });
  } else if (element === null) {
    return _react2.default.createElement("null", null);
  } else if (typeof element === 'string') {
    return _react2.default.createElement("string", {
      value: element
    });
  } else if (typeof element === 'boolean') {
    return _react2.default.createElement("boolean", {
      value: element
    });
  } else if (typeof element === 'number') {
    return _react2.default.createElement("number", {
      value: element
    });
  } else if (Array.isArray(element)) {
    return element.map(reduce);
  } else if (typeof element.type === 'function') {
    return reduce(element.type(element.props));
  } else if (typeof element === 'undefined') {
    return undefined;
  }

  var reducedChildren = [];

  if (Array.isArray(element.props.children)) {
    reducedChildren = element.props.children.map(reduce);
  } else if (element !== null) {
    reducedChildren = [reduce(element.props.children)];
  }

  var flattenedChildren = flatten(reducedChildren);
  return _extends({}, element, {
    props: _extends({}, element.props, {
      children: flattenedChildren
    })
  });
}

function flatten(array) {
  return array.reduce(function (accumulator, currentValue) {
    var currentValueArray = [];

    if (Array.isArray(currentValue)) {
      currentValueArray = flatten(currentValue);
    } else if (typeof currentValue !== 'undefined') {
      currentValueArray = [currentValue];
    }

    return [].concat(_toConsumableArray(accumulator), _toConsumableArray(currentValueArray));
  }, []);
}

function generateAST(element) {
  var children = [];

  if (Array.isArray(element.props.children)) {
    children = element.props.children.map(generateAST);
  } else if (_typeof(element.props.children) === 'object') {
    children = [generateAST(element.props.children)];
  }

  return _elements2.default[element.type](element, element.props, children);
}

var render = function render(element) {
  return (0, _babelGenerator2.default)(generateAST(reduce(element))).code;
};

exports.default = render;
exports.render = render;
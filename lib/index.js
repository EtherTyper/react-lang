"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.generateAST = exports.keyGenerator = void 0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.reduceToTree = reduceToTree;
exports.flatten = flatten;
exports.generateASTFromTree = generateASTFromTree;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function reduceToTree(element) {
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
    return element.map(reduceToTree);
  } else if (typeof element === 'undefined') {
    return undefined;
  } else if (typeof element.type === 'function') {
    return reduceToTree(element.type(element.props));
  }

  var reducedChildren = [];

  if (Array.isArray(element.props.children)) {
    reducedChildren = element.props.children.map(reduceToTree);
  } else if (element !== null) {
    reducedChildren = [reduceToTree(element.props.children)];
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

var keyGenerator = exports.keyGenerator =
/*#__PURE__*/
regeneratorRuntime.mark(function keyed(start) {
  var key;
  return regeneratorRuntime.wrap(function keyed$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          key = start;

        case 1:
          if (!true) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return key++;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, keyed, this);
})(0);

function generateASTFromTree(element) {
  if (Array.isArray(element)) {
    return generateAST(_react2.default.createElement("arrayExpression", null, element.map(function (element) {
      return _extends({}, element, {
        key: keyGenerator.next().value
      });
    })));
  }

  var children = [];

  if (Array.isArray(element.props.children)) {
    children = element.props.children.map(generateASTFromTree);
  } else if (_typeof(element.props.children) === 'object') {
    children = [generateASTFromTree(element.props.children)];
  }

  return _elements2.default[element.type](element, element.props, children);
}

var generateAST = exports.generateAST = function generateAST(element) {
  return generateASTFromTree(reduceToTree(element));
};

var render = exports.render = function render(element) {
  return (0, _babelGenerator2.default)(generateAST(element)).code;
};

exports.default = render;
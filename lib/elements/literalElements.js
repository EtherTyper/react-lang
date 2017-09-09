"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Literals = function Literals() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "literal",
      value: function literal(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("expression", props));
      }
    }, {
      key: "regExp",
      value: function regExp(element, props, children) {
        var value = props.value instanceof RegExp ? props.value : /.+/g;
        var pattern = value.source;
        var flags = value.flags;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("literal", {
          type: "RegExpLiteral"
        })), {
          pattern: pattern,
          flags: flags
        });
      }
    }, {
      key: "null",
      value: function _null(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("literal", {
          type: "NullLiteral"
        }));
      }
    }, {
      key: "string",
      value: function string(element, props, children) {
        var value = props.value || '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _child = _step.value;

            if (_child.type !== "StringLiteral") {
              throw TypeError("Strings can only contain strings");
            }

            value += _child.value;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("literal", {
          type: props.type || "StringLiteral"
        })), {
          value: value
        });
      }
    }, {
      key: "boolean",
      value: function boolean(element, props, children) {
        var value = typeof props.value === 'boolean' ? props.value : false;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("literal", {
          type: "BooleanLiteral"
        })), {
          value: value
        });
      }
    }, {
      key: "number",
      value: function number(element, props, children) {
        var value = typeof props.value === 'number' ? props.value : Math.random();
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("literal", {
          type: "NumericLiteral"
        })), {
          value: value
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Literals;
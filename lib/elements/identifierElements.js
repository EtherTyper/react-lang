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

var Identifiers = function Identifiers() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "identifier",
      value: function identifier(element, props, children) {
        var name = '';

        if (typeof props.name === 'string') {
          name = props.name;
        } else if (children[0].type === "StringLiteral") {
          name = children.shift().value;
        }

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "Identifier"
        })), {
          name: name
        });
      } // Doesn't work yet for some reason.

    }, {
      key: "privateName",
      value: function privateName(element, props, children) {
        var id = {};

        if (typeof props.name === 'string') {
          id = (0, _.generateAST)(_react2.default.createElement("identifier", null, props.name));
        } else if (children[0]) {
          if (children[0].type === "StringLiteral") {
            id = (0, _.generateAST)(_react2.default.createElement("identifier", null, children.shift().value));
          } else if (children[0].type === "Identifier") {
            id = children.shift();
          }
        } else {
          throw TypeError("Must supply identifier for private name.");
        }

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "PrivateName"
        })), {
          id: id
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Identifiers;
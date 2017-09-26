"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Templates = function Templates() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "templateLiteral",
      value: function templateLiteral(element, props, children) {
        var quasis = children.filter(function (child, index) {
          return index % 2 === 0;
        });
        var expressions = children.filter(function (child, index) {
          return index % 2 === 1;
        });
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "TemplateLiteral"
        })), {
          quasis: quasis,
          expressions: expressions
        });
      }
    }, {
      key: "taggedTemplate",
      value: function taggedTemplate(element, props, children) {
        var _children = _slicedToArray(children, 2),
            tag = _children[0],
            quasi = _children[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "TaggedTemplateExpression"
        })), {
          tag: tag,
          quasi: quasi
        });
      }
    }, {
      key: "templateElement",
      value: function templateElement(element, props, children) {
        var tail = typeof props.tail === 'boolean' ? props.tail : false;
        var raw = 'PHRPRHRUBHRBRRHPHGH';

        if (typeof props.raw === 'string') {
          raw = props.raw;
        } else if (children[0].type === "StringLiteral") {
          raw = children.shift().value;
        }

        var cooked = null;

        if (typeof props.cooked === 'undefined') {
          cooked = raw;
        } else if (props.cooked) {
          cooked = prop.cooked;
        }

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "TemplateElement"
        })), {
          tail: tail,
          value: {
            cooked: cooked,
            raw: raw
          }
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Templates;
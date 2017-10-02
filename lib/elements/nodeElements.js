"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nodes = function Nodes() {
  var _class, _temp;

  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return _temp = _class = function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "node",
      value: function node(element, props, children) {
        var type = '';

        if (typeof props.type === 'string') {
          type = props.type;
        } else if (children[0].type === "StringLiteral") {
          type = children.shift().value;
        }

        var loc = children.shift() || null;
        return new this.Node(type, loc);
      }
    }, {
      key: "sourceLocation",
      value: function sourceLocation(element, props, children) {
        var start = children.shift();
        var end = children.shift();
        var source = children.shift().value || null;
        return {
          source: source,
          start: start,
          end: end
        };
      }
    }, {
      key: "position",
      value: function position(element, props, children) {
        var line = 0;
        var column = 0;

        if (typeof props.line === 'number' && typeof props.column === 'number') {
          line = props.line;
          column = props.column;
        } else if (children) {
          line = children.shift().value;
          column = children.shift().value;
        }

        return {
          line: line,
          column: column
        };
      }
    }]);

    return BasicElements;
  }(Super), Object.defineProperty(_class, "Node", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      function Node(type, loc) {
        _classCallCheck(this, Node);

        this.type = type;
        this.loc = loc;
      }

      _createClass(Node, [{
        key: "rendered",
        get: function get() {
          return (0, _babelGenerator2.default)(this).code;
        }
      }]);

      return Node;
    }()
  }), _temp;
};

exports.default = Nodes;
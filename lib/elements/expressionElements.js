"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Expressions = function Expressions() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "expression",
      value: function expression(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("node", props));
      }
    }, {
      key: "super",
      value: function _super(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("node", {
          type: "Super"
        }));
      }
    }, {
      key: "import",
      value: function _import(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("node", {
          type: "Import"
        }));
      }
    }, {
      key: "thisExpression",
      value: function thisExpression(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ThisExpression"
        }));
      }
    }, {
      key: "yield",
      value: function _yield(element, props, children) {
        var delegate = typeof props.delegate === 'boolean' ? props.delegate : false;
        var argument = children.shift() || null;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "YieldExpression"
        })), {
          argument: argument,
          delegate: delegate
        });
      }
    }, {
      key: "await",
      value: function _await(element, props, children) {
        var argument = children.shift() || null;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "AwaitExpression"
        })), {
          argument: argument
        });
      }
    }, {
      key: "array",
      value: function array(element, props, children) {
        var elements = children;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ArrayExpression"
        })), {
          elements: elements
        });
      }
    }, {
      key: "unaryExpression",
      value: function unaryExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : 'typeof';
        var prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        var argument = children.shift();
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "UnaryExpression"
        })), {
          operator: operator,
          prefix: prefix,
          argument: argument
        });
      }
    }, {
      key: "updateExpression",
      value: function updateExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '--';
        var prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        var argument = children.shift();
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "UpdateExpression"
        })), {
          operator: operator,
          prefix: prefix,
          argument: argument
        });
      }
    }, {
      key: "binaryExpression",
      value: function binaryExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : 'instanceof';

        var _children = _slicedToArray(children, 2),
            left = _children[0],
            right = _children[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "BinaryExpression"
        })), {
          operator: operator,
          left: left,
          right: right
        });
      }
    }, {
      key: "assignmentExpression",
      value: function assignmentExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '>>>=';

        var _children2 = _slicedToArray(children, 2),
            left = _children2[0],
            right = _children2[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "AssignmentExpression"
        })), {
          operator: operator,
          left: left,
          right: right
        });
      }
    }, {
      key: "logicalExpression",
      value: function logicalExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '||';

        var _children3 = _slicedToArray(children, 2),
            left = _children3[0],
            right = _children3[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "LogicalExpression"
        })), {
          operator: operator,
          left: left,
          right: right
        });
      }
    }, {
      key: "bindExpression",
      value: function bindExpression(element, props, children) {
        var callee = children.pop();
        var object = children.pop() || null;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "BindExpression"
        })), {
          object: object,
          callee: callee
        });
      }
    }, {
      key: "conditionalExpression",
      value: function conditionalExpression(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '||';

        var _children4 = _slicedToArray(children, 3),
            test = _children4[0],
            consequent = _children4[1],
            alternate = _children4[2];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ConditionalExpression"
        })), {
          test: test,
          alternate: alternate,
          consequent: consequent
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Expressions;
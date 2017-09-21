"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

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

        var _children = _slicedToArray(children, 1),
            _children$ = _children[0],
            argument = _children$ === void 0 ? null : _children$;

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
        var _children2 = _slicedToArray(children, 1),
            _children2$ = _children2[0],
            argument = _children2$ === void 0 ? null : _children2$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "AwaitExpression"
        })), {
          argument: argument
        });
      }
    }, {
      key: "arrayExpression",
      value: function arrayExpression(element, props, children) {
        var elements = children;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ArrayExpression"
        })), {
          elements: elements
        });
      }
    }, {
      key: "object",
      value: function object(element, props, children) {}
    }, {
      key: "objectMember",
      value: function objectMember(element, props, children) {
        var key = props.key;
        var decorators = props.decorators;
        var computed = typeof props.computed === 'boolean' ? props.computed : false;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", props)), {
          key: key,
          computed: computed,
          decorators: decorators
        });
      }
    }, {
      key: "objectProperty",
      value: function objectProperty(element, props, children) {
        var _children3 = _toArray(children),
            key = _children3[0],
            value = _children3[1],
            decorators = _children3.slice(2);

        var shorthand = typeof props.shorthand === 'boolean' ? props.shorthand : false;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("objectMember", _extends({}, props, {
          type: "ObjectProperty",
          key: key,
          decorators: decorators
        }))), {
          shorthand: shorthand,
          value: value
        });
      }
    }, {
      key: "unary",
      value: function unary(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : 'typeof';
        var prefix = typeof props.prefix === 'boolean' ? props.prefix : false;

        var _children4 = _slicedToArray(children, 1),
            argument = _children4[0];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "UnaryExpression"
        })), {
          operator: operator,
          prefix: prefix,
          argument: argument
        });
      }
    }, {
      key: "update",
      value: function update(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '--';
        var prefix = typeof props.prefix === 'boolean' ? props.prefix : false;

        var _children5 = _slicedToArray(children, 1),
            argument = _children5[0];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "UpdateExpression"
        })), {
          operator: operator,
          prefix: prefix,
          argument: argument
        });
      }
    }, {
      key: "binary",
      value: function binary(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : 'instanceof';

        var _children6 = _slicedToArray(children, 2),
            left = _children6[0],
            right = _children6[1];

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

        var _children7 = _slicedToArray(children, 2),
            left = _children7[0],
            right = _children7[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "AssignmentExpression"
        })), {
          operator: operator,
          left: left,
          right: right
        });
      }
    }, {
      key: "logical",
      value: function logical(element, props, children) {
        var operator = typeof props.operator === 'string' ? props.operator : '||';

        var _children8 = _slicedToArray(children, 2),
            left = _children8[0],
            right = _children8[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "LogicalExpression"
        })), {
          operator: operator,
          left: left,
          right: right
        });
      }
    }, {
      key: "bind",
      value: function bind(element, props, children) {
        var _children$reverse = children.reverse(),
            _children$reverse2 = _slicedToArray(_children$reverse, 2),
            callee = _children$reverse2[0],
            _children$reverse2$ = _children$reverse2[1],
            object = _children$reverse2$ === void 0 ? null : _children$reverse2$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "BindExpression"
        })), {
          object: object,
          callee: callee
        });
      }
    }, {
      key: "conditional",
      value: function conditional(element, props, children) {
        var _children9 = _slicedToArray(children, 3),
            test = _children9[0],
            consequent = _children9[1],
            alternate = _children9[2];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ConditionalExpression"
        })), {
          test: test,
          alternate: alternate,
          consequent: consequent
        });
      }
    }, {
      key: "call",
      value: function call(element, props, children) {
        var optional = typeof props.optional === 'boolean' ? props.optional : null;

        var _children10 = _toArray(children),
            callee = _children10[0],
            callArguments = _children10.slice(1);

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: props.type || "CallExpression"
        })), {
          callee: callee,
          arguments: callArguments,
          optional: optional
        });
      }
    }, {
      key: "new",
      value: function _new(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("call", _extends({}, props, {
          type: "NewExpression"
        })));
      }
    }, {
      key: "sequence",
      value: function sequence(element, props, children) {
        var expressions = children;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "SequenceExpression"
        })), {
          expressions: expressions
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Expressions;
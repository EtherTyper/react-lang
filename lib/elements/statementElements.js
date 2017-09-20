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

var Statements = function Statements() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "statement",
      value: function statement(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("node", props));
      }
    }, {
      key: "expressionStatement",
      value: function expressionStatement(element, props, children) {
        var _children = _slicedToArray(children, 1),
            expression = _children[0];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ExpressionStatement"
        })), {
          expression: expression
        });
      }
    }, {
      key: "block",
      value: function block(element, props, children) {
        var body = children.filter(function (child) {
          return child.type !== 'Directive';
        });
        var directives = children.filter(function (child) {
          return child.type === 'Directive';
        });
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "BlockStatement"
        })), {
          body: body,
          directives: directives
        });
      }
    }, {
      key: "empty",
      value: function empty(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "EmptyStatement"
        }));
      }
    }, {
      key: "debugger",
      value: function _debugger(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "DebuggerStatement"
        }));
      }
    }, {
      key: "with",
      value: function _with(element, props, children) {
        var _children2 = _slicedToArray(children, 2),
            object = _children2[0],
            body = _children2[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "WithStatement"
        })), {
          object: object,
          body: body
        });
      }
    }, {
      key: "return",
      value: function _return(element, props, children) {
        var _children3 = _slicedToArray(children, 1),
            _children3$ = _children3[0],
            argument = _children3$ === void 0 ? null : _children3$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ReturnStatement"
        })), {
          argument: argument
        });
      }
    }, {
      key: "label",
      value: function label(element, props, children) {
        var _children4 = _slicedToArray(children, 2),
            label = _children4[0],
            body = _children4[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "LabeledStatement"
        })), {
          label: label,
          body: body
        });
      }
    }, {
      key: "break",
      value: function _break(element, props, children) {
        var _children5 = _slicedToArray(children, 1),
            _children5$ = _children5[0],
            label = _children5$ === void 0 ? null : _children5$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "BreakStatement"
        })), {
          label: label
        });
      }
    }, {
      key: "continue",
      value: function _continue(element, props, children) {
        var _children6 = _slicedToArray(children, 1),
            _children6$ = _children6[0],
            label = _children6$ === void 0 ? null : _children6$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ContinueStatement"
        })), {
          label: label
        });
      }
    }, {
      key: "if",
      value: function _if(element, props, children) {
        var _children7 = _slicedToArray(children, 3),
            test = _children7[0],
            consequent = _children7[1],
            _children7$ = _children7[2],
            alternate = _children7$ === void 0 ? null : _children7$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "IfStatement"
        })), {
          test: test,
          alternate: alternate,
          consequent: consequent
        });
      }
    }, {
      key: "switch",
      value: function _switch(element, props, children) {
        var _children8 = _toArray(children),
            discriminant = _children8[0],
            cases = _children8.slice(1);

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "SwitchStatement"
        })), {
          discriminant: discriminant,
          cases: cases
        });
      }
    }, {
      key: "case",
      value: function _case(element, props, children) {
        var _children9 = _toArray(children),
            test = _children9[0],
            consequent = _children9.slice(1);

        if (test.type === 'NullLiteral') {
          test = null;
        }

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "SwitchCase"
        })), {
          test: test,
          consequent: consequent
        });
      }
    }, {
      key: "default",
      value: function _default(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("case", null, _react2.default.createElement("null", null), props.children));
      }
    }, {
      key: "throw",
      value: function _throw(element, props, children) {
        var _children10 = _slicedToArray(children, 1),
            argument = _children10[0];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ThrowStatement"
        })), {
          argument: argument
        });
      }
    }, {
      key: "try",
      value: function _try(element, props, children) {
        var _children11 = _slicedToArray(children, 1),
            block = _children11[0];

        var handler = props.handler ? (0, _.generateAST)(props.handler) : null;
        var finalizer = props.finalizer ? (0, _.generateAST)(props.finalizer) : null;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "TryStatement"
        })), {
          block: block,
          handler: handler,
          finalizer: finalizer
        });
      }
    }, {
      key: "catch",
      value: function _catch(element, props, children) {
        var _children$reverse = children.reverse(),
            _children$reverse2 = _slicedToArray(_children$reverse, 2),
            body = _children$reverse2[0],
            _children$reverse2$ = _children$reverse2[1],
            param = _children$reverse2$ === void 0 ? null : _children$reverse2$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "CatchClause"
        })), {
          param: param,
          body: body
        });
      }
    }, {
      key: "while",
      value: function _while(element, props, children) {
        var _children12 = _slicedToArray(children, 2),
            test = _children12[0],
            body = _children12[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "WhileStatement"
        })), {
          test: test,
          body: body
        });
      }
    }, {
      key: "doWhile",
      value: function doWhile(element, props, children) {
        var _children13 = _slicedToArray(children, 2),
            body = _children13[0],
            test = _children13[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "DoWhileStatement"
        })), {
          body: body,
          test: test
        });
      }
    }, {
      key: "for",
      value: function _for(element, props, children) {
        var _children14 = _slicedToArray(children, 1),
            body = _children14[0];

        var init = props.init ? (0, _.generateAST)(props.init) : null;
        var test = props.test ? (0, _.generateAST)(props.test) : null;
        var update = props.update ? (0, _.generateAST)(props.update) : null;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ForStatement"
        })), {
          init: init,
          test: test,
          update: update,
          body: body
        });
      }
    }, {
      key: "forIn",
      value: function forIn(element, props, children) {
        var _children15 = _slicedToArray(children, 1),
            body = _children15[0];

        var left = (0, _.generateAST)(props.left || _react2.default.createElement("number", null));
        var right = (0, _.generateAST)(props.right || _react2.default.createElement("number", null));
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", {
          type: "ForInStatement"
        })), {
          left: left,
          right: right,
          body: body
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Statements;
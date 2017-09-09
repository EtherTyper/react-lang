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
      key: "blockStatement",
      value: function blockStatement(element, props, children) {
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
      key: "emptyStatement",
      value: function emptyStatement(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "EmptyStatement"
        })));
      }
    }, {
      key: "debuggerStatement",
      value: function debuggerStatement(element, props, children) {
        return (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "DebuggerStatement"
        })));
      }
    }, {
      key: "withStatement",
      value: function withStatement(element, props, children) {
        var _children2 = _slicedToArray(children, 2),
            object = _children2[0],
            body = _children2[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "WithStatement"
        }))), {
          object: object,
          body: body
        });
      }
    }, {
      key: "returnStatement",
      value: function returnStatement(element, props, children) {
        var _children3 = _slicedToArray(children, 1),
            _children3$ = _children3[0],
            argument = _children3$ === void 0 ? null : _children3$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "ReturnStatement"
        }))), {
          argument: argument
        });
      }
    }, {
      key: "labeledStatement",
      value: function labeledStatement(element, props, children) {
        var _children4 = _slicedToArray(children, 2),
            label = _children4[0],
            body = _children4[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "LabeledStatement"
        }))), {
          label: label,
          body: body
        });
      }
    }, {
      key: "breakStatement",
      value: function breakStatement(element, props, children) {
        var _children5 = _slicedToArray(children, 1),
            _children5$ = _children5[0],
            label = _children5$ === void 0 ? null : _children5$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "BreakStatement"
        }))), {
          label: label
        });
      }
    }, {
      key: "continueStatement",
      value: function continueStatement(element, props, children) {
        var _children6 = _slicedToArray(children, 1),
            _children6$ = _children6[0],
            label = _children6$ === void 0 ? null : _children6$;

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("statement", _extends({}, props, {
          type: "ContinueStatement"
        }))), {
          label: label
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Statements;
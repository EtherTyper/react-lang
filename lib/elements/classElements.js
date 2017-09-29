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

var Classes = function Classes() {
  var Super = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;
  return function (_Super) {
    _inherits(BasicElements, _Super);

    function BasicElements() {
      _classCallCheck(this, BasicElements);

      return _possibleConstructorReturn(this, (BasicElements.__proto__ || Object.getPrototypeOf(BasicElements)).apply(this, arguments));
    }

    _createClass(BasicElements, null, [{
      key: "class",
      value: function _class(element, props, children) {
        var body = children.find(function (child) {
          return child.type === 'ClassBody';
        });
        var decorators = children.filter(function (child) {
          return child.type === 'Decorator';
        });
        var id = (0, _.generateAST)(props.id || null);
        var superClass = (0, _.generateAST)(props.superClass || null);
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", props)), {
          id: id,
          superClass: superClass,
          body: body,
          decorators: decorators
        });
      }
    }, {
      key: "classBody",
      value: function classBody(element, props, children) {
        var body = children;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "ClassBody"
        })), {
          body: body
        });
      }
    }, {
      key: "classMethod",
      value: function classMethod(element, props, children) {
        var decorators = children.filter(function (child) {
          return child.type === 'Decorator';
        });

        var _props$children$filte = props.children.filter(function (child, index) {
          return children[index].type !== 'Decorator';
        }),
            _props$children$filte2 = _slicedToArray(_props$children$filte, 2),
            key = _props$children$filte2[0],
            body = _props$children$filte2[1];

        var id = props.id || null;
        var params = props.params;
        var generator = typeof props.generator === 'boolean' ? props.generator : false;
        var async = typeof props.async === 'boolean' ? props.async : false;
        var computed = typeof props.computed === 'boolean' ? props.computed : false;
        var isStatic = typeof props.static === 'boolean' ? props.static : false; // TODO: Once babel-generator uses 'constructor' instead of 'init', like their AST specification
        // suggests they do, remove the first part of this line. Babel is (awesomely) always on the run...

        var kind = props.kind === 'constructor' ? 'init' : props.kind || 'get';
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("function", {
          type: "ClassMethod",
          id: id,
          params: params,
          generator: generator,
          async: async
        }, body)), {
          key: (0, _.generateAST)(key),
          kind: kind,
          computed: computed,
          static: isStatic,
          decorators: decorators
        });
      }
    }, {
      key: "classPrivateMethod",
      value: function classPrivateMethod(element, props, children) {
        var decorators = children.filter(function (child) {
          return child.type === 'Decorator';
        });

        var _props$children$filte3 = props.children.filter(function (child, index) {
          return children[index].type !== 'Decorator';
        }),
            _props$children$filte4 = _slicedToArray(_props$children$filte3, 2),
            key = _props$children$filte4[0],
            body = _props$children$filte4[1];

        var id = props.id || null;
        var params = props.params;
        var generator = typeof props.generator === 'boolean' ? props.generator : false;
        var async = typeof props.async === 'boolean' ? props.async : false;
        var isStatic = typeof props.static === 'boolean' ? props.static : false;
        var kind = props.kind || 'get';
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("function", {
          type: "ClassPrivateMethod",
          id: id,
          params: params,
          generator: generator,
          async: async
        }, body)), {
          key: (0, _.generateAST)(key),
          kind: kind,
          static: isStatic,
          decorators: decorators
        });
      }
    }, {
      key: "classProperty",
      value: function classProperty(element, props, children) {
        var _children = _slicedToArray(children, 2),
            key = _children[0],
            value = _children[1];

        var isStatic = typeof props.static === 'boolean' ? props.static : false;
        var computed = typeof props.computed === 'boolean' ? props.computed : false;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "ClassProperty"
        })), {
          key: key,
          value: value,
          static: isStatic,
          computed: computed
        });
      }
    }, {
      key: "classPrivateProperty",
      value: function classPrivateProperty(element, props, children) {
        var _children2 = _slicedToArray(children, 2),
            key = _children2[0],
            value = _children2[1];

        var isStatic = typeof props.static === 'boolean' ? props.static : false;
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("node", {
          type: "ClassProperty"
        })), {
          key: key,
          value: value,
          static: isStatic
        });
      }
    }, {
      key: "classDeclaration",
      value: function classDeclaration(element, props, children) {
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("class", _extends({}, props, {
          type: "ClassDeclaration"
        }))), (0, _.generateAST)(_react2.default.createElement("declaration", {
          type: "ClassDeclaration"
        })));
      }
    }, {
      key: "classExpression",
      value: function classExpression(element, props, children) {
        return _extends({}, (0, _.generateAST)(_react2.default.createElement("class", _extends({}, props, {
          type: "ClassExpression"
        }))), (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "ClassExpression"
        })));
      }
    }, {
      key: "metaProperty",
      value: function metaProperty(element, props, children) {
        var _children3 = _slicedToArray(children, 2),
            meta = _children3[0],
            property = _children3[1];

        return _extends({}, (0, _.generateAST)(_react2.default.createElement("expression", {
          type: "MetaProperty"
        })), {
          meta: meta,
          property: property
        });
      }
    }]);

    return BasicElements;
  }(Super);
};

exports.default = Classes;
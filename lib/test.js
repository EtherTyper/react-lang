"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var HelloGenerator = function HelloGenerator(_ref) {
  var name = _ref.name,
      children = _ref.children;
  return _react2.default.createElement("string", null, "Hello ", name, "!", children ? [' '].concat(_toConsumableArray(children)) : '');
};

var functionalElement = _react2.default.createElement(HelloGenerator, {
  name: "Linda"
}, "Yo!", ' ', _react2.default.createElement(HelloGenerator, {
  name: "Bob"
}));

function testElement(element) {
  var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  description = description || (0, _.reduceToTree)(element).type;
  description = description.charAt(0).toUpperCase() + description.slice(1);

  try {
    var producedCode = (0, _.render)(element);

    if (!producedCode.includes('\n')) {
      console.log("".concat(description, ": ").concat(producedCode));
    } else {
      var formattedCode = '\n  ' + producedCode.split('\n').join('\n  '); // Double space master-race

      console.log("".concat(description, ": ").concat(formattedCode));
    }
  } catch (exception) {
    process.stdout.write("\x1B[1;31m"); // Red and bold.

    if (process.env.DEBUG) {
      console.log("".concat(description, ": ").concat(exception.stack));
    } else {
      console.log("".concat(description, ": ").concat(exception));
    }

    process.stdout.write("\x1B[0m"); // Resets font.

    try {
      console.log("Generated AST for ".concat(description, ": ").concat(JSON.stringify((0, _.generateAST)(element), null, 2)));
    } catch (_unused) {
      try {
        console.log("Reduced element tree for ".concat(description, ": ").concat(JSON.stringify((0, _.reduceToTree)(element), null, 2)));
      } catch (_unused2) {
        console.log("Raw JSX component for ".concat(description, ": ").concat(JSON.stringify(element, null, 2)));
      }
    }
  }
}

function elementSection(description) {
  description = description.charAt(0).toUpperCase() + description.slice(1);
  process.stdout.write("\n\x1B[1;34m"); // Green and bold and prints new line.

  console.log("".concat(description, " Components"));
  process.stdout.write("\x1B[0m\n"); // Resets font and prints new line.
}

elementSection('program');
testElement(_react2.default.createElement("program", {
  sourceType: "script"
}, _react2.default.createElement("expressionStatement", null, 3), _react2.default.createElement("directive", null, _react2.default.createElement("directiveLiteral", null, "use helloWorld"))));
elementSection('literal');
testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false);
elementSection('identifier');
testElement(_react2.default.createElement("identifier", null, "helloWorld"));
testElement(_react2.default.createElement("privateName", null, "helloIlluminati"));
elementSection('statement');
testElement(_react2.default.createElement("expressionStatement", null, 3));
testElement(_react2.default.createElement("block", null, _react2.default.createElement("expressionStatement", null, 3), _react2.default.createElement("directive", null, _react2.default.createElement("directiveLiteral", null, "use helloWorld"))));
testElement(_react2.default.createElement("empty", null));
testElement(_react2.default.createElement("debugger", null));
testElement(_react2.default.createElement("with", null, _react2.default.createElement("identifier", null, "World"), _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello")))));
testElement(_react2.default.createElement("return", null, 3));
testElement(_react2.default.createElement("label", null, _react2.default.createElement("identifier", null, "codeLocation"), _react2.default.createElement("debugger", null)));
testElement(_react2.default.createElement("break", null, _react2.default.createElement("identifier", null, "codeLocation")));
testElement(_react2.default.createElement("continue", null, _react2.default.createElement("identifier", null, "codeLocation")));
testElement(_react2.default.createElement("if", null, 3, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "helloWorld"))), _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "goodbyeWorld")))));
testElement(_react2.default.createElement("switch", null, _react2.default.createElement("identifier", null, "number"), _react2.default.createElement("case", null, 3, _react2.default.createElement("debugger", null)), _react2.default.createElement("default", null, _react2.default.createElement("debugger", null))));
testElement(_react2.default.createElement("case", null, 3, _react2.default.createElement("debugger", null)));
testElement(_react2.default.createElement("default", null, _react2.default.createElement("debugger", null)));
testElement(_react2.default.createElement("throw", null, 3));
testElement(_react2.default.createElement("catch", null, _react2.default.createElement("identifier", null, "error"), _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))));
testElement(_react2.default.createElement("try", {
  handler: _react2.default.createElement("catch", null, _react2.default.createElement("identifier", null, "error"), _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))),
  finalizer: _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))
}, _react2.default.createElement("block", null, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("null", null), _react2.default.createElement("identifier", null, "helloWorld"))))));
testElement(_react2.default.createElement("while", null, 3, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello")))));
testElement(_react2.default.createElement("doWhile", null, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello"))), 3));
testElement(_react2.default.createElement("for", {
  init: 3,
  test: 4,
  update: 5
}, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello")))));
testElement(_react2.default.createElement("forIn", {
  left: _react2.default.createElement("identifier", null, "index"),
  right: [3, 4, 5]
}, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello"), _react2.default.createElement("identifier", null, "index")))));
testElement(_react2.default.createElement("forOf", {
  left: _react2.default.createElement("identifier", null, "number"),
  right: [3, 4, 5],
  "await": true
}, _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello"), _react2.default.createElement("identifier", null, "number")))));
elementSection('declarations');
testElement(_react2.default.createElement("functionDeclaration", {
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  generator: true,
  async: true,
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))));
testElement(_react2.default.createElement("variableDeclaration", {
  kind: "const"
}, _react2.default.createElement("variableDeclarator", null, _react2.default.createElement("identifier", null, "greeting")), _react2.default.createElement("variableDeclarator", null, _react2.default.createElement("identifier", null, "initializedGreeting"), "Hello world!")));
testElement(_react2.default.createElement("variableDeclarator", null, _react2.default.createElement("identifier", null, "greeting")), 'Empty VariableDeclarator');
testElement(_react2.default.createElement("variableDeclarator", null, _react2.default.createElement("identifier", null, "greeting"), "Hello world!"));
elementSection('expression');
testElement(_react2.default.createElement("super", null));
testElement(_react2.default.createElement("import", null));
testElement(_react2.default.createElement("thisExpression", null));
testElement(_react2.default.createElement("arrowFunction", {
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  async: true,
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))), 'Block ArrowFunction');
testElement(_react2.default.createElement("arrowFunction", {
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  async: true,
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), "What's up world?")), 'Expression ArrowFunction');
testElement(_react2.default.createElement("yield", {
  delegate: true
}, 3));
testElement(_react2.default.createElement("await", null, 3));
testElement([3, 4, 5], 'arrayExpression');
testElement(_react2.default.createElement("objectExpression", null, _react2.default.createElement("objectProperty", {
  shorthand: true
}, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "hello")), _react2.default.createElement("objectProperty", {
  computed: true
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world")), _react2.default.createElement("objectMethod", {
  computed: true,
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  generator: true,
  async: true,
  kind: "set",
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))), _react2.default.createElement("spread", null, _react2.default.createElement("identifier", null, "toExtend"))));
testElement(_react2.default.createElement("objectProperty", {
  shorthand: true
}, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "hello")), 'Shorthand ObjectProperty');
testElement(_react2.default.createElement("objectProperty", {
  computed: true
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world")), 'Computed ObjectProperty');
testElement(_react2.default.createElement("objectMethod", {
  computed: true,
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  generator: true,
  async: true,
  kind: "set",
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))));
testElement(_react2.default.createElement("functionExpression", {
  id: _react2.default.createElement("identifier", null, "helloWorld"),
  generator: true,
  async: true,
  params: [_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object"))]
}, _react2.default.createElement("block", null, _react2.default.createElement("debugger", null))));
testElement(_react2.default.createElement("unary", {
  operator: "+",
  prefix: false
}, 3));
testElement(_react2.default.createElement("update", {
  operator: "--",
  prefix: false
}, _react2.default.createElement("identifier", null, "helloWorld"), 4));
testElement(_react2.default.createElement("binary", {
  operator: "==="
}, 3, 4));
testElement(_react2.default.createElement("assignmentExpression", {
  operator: ">>>="
}, _react2.default.createElement("identifier", null, "helloWorld"), 4));
testElement(_react2.default.createElement("logical", {
  operator: "||"
}, 3, 4));
testElement(_react2.default.createElement("spread", null, _react2.default.createElement("identifier", null, "toExtend")));
testElement(_react2.default.createElement("member", {
  computed: true,
  optional: true
}, _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "sayHello")));
testElement(_react2.default.createElement("bind", null, _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "sayHello")));
testElement(_react2.default.createElement("conditional", null, 3, 4, 5));
testElement(_react2.default.createElement("call", {
  optional: true
}, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), "What's up world?"));
testElement(_react2.default.createElement("new", null, _react2.default.createElement("identifier", null, "Hello"), _react2.default.createElement("identifier", null, "world"), "What's up world?"));
testElement(_react2.default.createElement("sequence", null, 3, 4, 5));
testElement(_react2.default.createElement("do", null, _react2.default.createElement("block", null, _react2.default.createElement("if", null, _react2.default.createElement("identifier", null, "condition"), _react2.default.createElement("expressionStatement", null, 3), _react2.default.createElement("expressionStatement", null, 4)))));
elementSection('templateLiteral');
testElement(_react2.default.createElement("templateLiteral", null, _react2.default.createElement("templateElement", null, _react2.default.createElement("string", null, "One plus two is", ' ')), _react2.default.createElement("binary", {
  operator: "+"
}, 1, 2), _react2.default.createElement("templateElement", {
  tail: true
}, ".")));
testElement(_react2.default.createElement("taggedTemplate", null, _react2.default.createElement("member", null, _react2.default.createElement("identifier", null, "String"), _react2.default.createElement("identifier", null, "soRawASkilledVetCouldStillSaveIt")), _react2.default.createElement("templateLiteral", null, _react2.default.createElement("templateElement", null, _react2.default.createElement("string", null, "One plus two is", ' ')), _react2.default.createElement("binary", {
  operator: "+"
}, 1, 2), _react2.default.createElement("templateElement", {
  tail: true
}, "."))));
process.stdout.write("\x1B[1;33m");
console.log('TemplateElement: These require information about their parents to generate, and therefore cannot be tested individually.');
process.stdout.write("\x1B[0m");
elementSection('pattern');
testElement(_react2.default.createElement("assignmentProperty", {
  computed: true
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("restElement", null, _react2.default.createElement("identifier", null, "world"))));
testElement(_react2.default.createElement("objectPattern", null, _react2.default.createElement("assignmentProperty", {
  computed: true
}, _react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "greetable")), _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("restElement", null, _react2.default.createElement("identifier", null, "world"))), _react2.default.createElement("restElement", null, _react2.default.createElement("identifier", null, "helloWorld"))));
testElement(_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), [null, null, null, null]
/* Gotta have dose element-skipping commas */
, _react2.default.createElement("identifier", null, "object")));
testElement(_react2.default.createElement("restElement", null, _react2.default.createElement("identifier", null, "helloWorld")));
testElement(_react2.default.createElement("assignmentPattern", null, _react2.default.createElement("identifier", null, "helloWorld"), 4));
elementSection('miscellaneous');
testElement(_react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "helloWorld")));
testElement(_react2.default.createElement("directive", null, _react2.default.createElement("directiveLiteral", null, "use helloWorld"))); // Features that I added

elementSection('special');
testElement(functionalElement, 'Functional Element'); // User-defined components

Promise.resolve().then(function () {
  return require('babylon');
}).then(function (babylon) {
  testElement(_react2.default.createElement("parse", {
    babylon: babylon
  }, _react2.default.createElement("string", null, "const babel = react = ", '{', "awesome: true }")), 'ParsedElement');
  testElement(_react2.default.createElement("parse", {
    babylon: babylon,
    handler: function handler(ast) {
      // The initial value of the first variable declared in the first statement of the program body.
      return ast.body[0].declarations[0].init;
    }
  }, _react2.default.createElement("string", null, "const babel = react = ", '{', "awesome: true }")), 'Selective ParsedElement');
});
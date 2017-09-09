"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function testElement(element, description) {
  description = description || (0, _.reduceToTree)(element).type;
  description = description.charAt(0).toUpperCase() + description.slice(1);

  try {
    console.log(description + ": " + (0, _.render)(element));
  } catch (exception) {
    process.stdout.write("\x1B[1;31m"); // Red and bold.

    console.log(description + ": " + exception.stack);
    process.stdout.write("\x1B[0m"); // Resets font.

    try {
      console.log("Generated AST for " + description + ": " + JSON.stringify((0, _.generateAST)(element), null, 2));
    } catch (_unused) {
      try {
        console.log("Reduced element tree for " + description + ": " + JSON.stringify((0, _.reduceToTree)(element), null, 2));
      } catch (_unused2) {
        console.log("Raw JSX component for " + description + ": " + JSON.stringify(element, null, 2));
      }
    }
  }
}

function elementSection(description) {
  description = description.charAt(0).toUpperCase() + description.slice(1);
  process.stdout.write("\n\x1B[1;34m"); // Green and bold and prints new line.

  console.log(description + " Components");
  process.stdout.write("\x1B[0m\n"); // Resets font and prints new line.
}

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
testElement(_react2.default.createElement("blockStatement", null, _react2.default.createElement("expressionStatement", null, 3), _react2.default.createElement("directive", null, _react2.default.createElement("directiveLiteral", null, "use helloWorld"))));
testElement(_react2.default.createElement("emptyStatement", null));
testElement(_react2.default.createElement("debuggerStatement", null));
testElement(_react2.default.createElement("withStatement", null, _react2.default.createElement("identifier", null, "World"), _react2.default.createElement("expressionStatement", null, _react2.default.createElement("call", null, _react2.default.createElement("identifier", null, "sayHello")))));
testElement(_react2.default.createElement("returnStatement", null, 3));
testElement(_react2.default.createElement("labeledStatement", null, _react2.default.createElement("identifier", null, "codeLocation"), _react2.default.createElement("debuggerStatement", null)));
testElement(_react2.default.createElement("breakStatement", null, _react2.default.createElement("identifier", null, "codeLocation")));
testElement(_react2.default.createElement("continueStatement", null, _react2.default.createElement("identifier", null, "codeLocation")));
elementSection('expression');
testElement(_react2.default.createElement("super", null));
testElement(_react2.default.createElement("import", null));
testElement(_react2.default.createElement("thisExpression", null));
testElement(_react2.default.createElement("yield", {
  delegate: true
}, 3));
testElement(_react2.default.createElement("await", null, 3));
testElement(_react2.default.createElement("arrayExpression", null, 3, 4, 5));
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
testElement(_react2.default.createElement("bind", null, _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "sayHello")));
testElement(_react2.default.createElement("conditional", null, 3, 4, 5));
testElement(_react2.default.createElement("call", {
  optional: true
}, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), "What's up world?"));
testElement(_react2.default.createElement("new", null, _react2.default.createElement("identifier", null, "Hello"), _react2.default.createElement("identifier", null, "world"), "What's up world?"));
testElement(_react2.default.createElement("sequence", null, 3, 4, 5));
elementSection('pattern');
testElement(_react2.default.createElement("arrayPattern", null, _react2.default.createElement("identifier", null, "hello"), _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "object")));
testElement(_react2.default.createElement("restElement", null, _react2.default.createElement("identifier", null, "helloWorld")));
testElement(_react2.default.createElement("assignmentPattern", null, _react2.default.createElement("identifier", null, "helloWorld"), 4));
elementSection('miscellaneous');
testElement(_react2.default.createElement("decorator", null, _react2.default.createElement("identifier", null, "helloWorld")));
testElement(_react2.default.createElement("directive", null, _react2.default.createElement("directiveLiteral", null, "use helloWorld"))); // Functional (User-defined) Components

elementSection('special');
testElement(functionalElement, 'Functional Element');
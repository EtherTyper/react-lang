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

    console.log(description + ": " + exception);
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
} // Literals


testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false); // Identifiers

testElement(_react2.default.createElement("identifier", null, "helloWorld"));
testElement(_react2.default.createElement("privateName", null, "helloIlluminati")); // Expressions

testElement(_react2.default.createElement("super", null));
testElement(_react2.default.createElement("import", null));
testElement(_react2.default.createElement("thisExpression", null));
testElement(_react2.default.createElement("yield", {
  delegate: true
}, 3));
testElement(_react2.default.createElement("await", null, 3));
testElement(_react2.default.createElement("array", null, 3, 4, 5));
testElement(_react2.default.createElement("unaryExpression", {
  operator: "+",
  prefix: false
}, 3));
testElement(_react2.default.createElement("updateExpression", {
  operator: "--",
  prefix: false
}, 3, 4));
testElement(_react2.default.createElement("binaryExpression", {
  operator: "==="
}, 3, 4));
testElement(_react2.default.createElement("assignmentExpression", {
  operator: ">>>="
}, _react2.default.createElement("identifier", null, "helloWorld"), 4));
testElement(_react2.default.createElement("logicalExpression", {
  operator: "||"
}, 3, 4));
testElement(_react2.default.createElement("bindExpression", null, _react2.default.createElement("identifier", null, "world"), _react2.default.createElement("identifier", null, "sayHello")));
testElement(_react2.default.createElement("conditionalExpression", null, 3, 4, 5)); // Functional (User-defined) Components

testElement(functionalElement, 'Functional Element');
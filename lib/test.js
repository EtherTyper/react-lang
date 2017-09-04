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
  description = description || (0, _.reduce)(element).type;
  description = description.charAt(0).toUpperCase() + description.slice(1);

  try {
    console.log(description + ": " + (0, _.render)(element));
  } catch (exception) {
    process.stdout.write("\x1B[1;31m"); // Red and bold.

    console.log(description + ": " + exception);
    process.stdout.write("\x1B[0m"); // Resets font.

    try {
      console.log("Generated AST for " + description + ": " + JSON.stringify((0, _.generateAST)((0, _.reduce)(element)), null, 2));
    } catch (_unused) {
      try {
        console.log("Reduced element tree for " + description + ": " + JSON.stringify((0, _.reduce)(element), null, 2));
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
testElement(_react2.default.createElement("privateName", null, "helloIlluminati")); // Functional (User-defined) Components

testElement(functionalElement, 'Functional Element');
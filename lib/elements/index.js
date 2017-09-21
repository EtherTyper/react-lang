"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeElements = require("./nodeElements");

var _nodeElements2 = _interopRequireDefault(_nodeElements);

var _programElements = require("./programElements");

var _programElements2 = _interopRequireDefault(_programElements);

var _functionElement = require("./functionElement");

var _functionElement2 = _interopRequireDefault(_functionElement);

var _patternElements = require("./patternElements");

var _patternElements2 = _interopRequireDefault(_patternElements);

var _expressionElements = require("./expressionElements");

var _expressionElements2 = _interopRequireDefault(_expressionElements);

var _literalElements = require("./literalElements");

var _literalElements2 = _interopRequireDefault(_literalElements);

var _identifierElements = require("./identifierElements");

var _identifierElements2 = _interopRequireDefault(_identifierElements);

var _otherElements = require("./otherElements");

var _otherElements2 = _interopRequireDefault(_otherElements);

var _statementElements = require("./statementElements.js");

var _statementElements2 = _interopRequireDefault(_statementElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ElementTypes = [_nodeElements2.default, _programElements2.default, _functionElement2.default, _patternElements2.default, _expressionElements2.default, _literalElements2.default, _identifierElements2.default, _otherElements2.default, _statementElements2.default];
var BasicElements = ElementTypes.reduce(function (accumulator, CurrentClass) {
  return CurrentClass(accumulator);
}, Object);
exports.default = BasicElements;
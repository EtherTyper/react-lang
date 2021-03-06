"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeElements = require("./nodeElements");

var _nodeElements2 = _interopRequireDefault(_nodeElements);

var _programElements = require("./programElements");

var _programElements2 = _interopRequireDefault(_programElements);

var _functionElements = require("./functionElements");

var _functionElements2 = _interopRequireDefault(_functionElements);

var _patternElements = require("./patternElements");

var _patternElements2 = _interopRequireDefault(_patternElements);

var _expressionElements = require("./expressionElements");

var _expressionElements2 = _interopRequireDefault(_expressionElements);

var _templateElements = require("./templateElements");

var _templateElements2 = _interopRequireDefault(_templateElements);

var _literalElements = require("./literalElements");

var _literalElements2 = _interopRequireDefault(_literalElements);

var _identifierElements = require("./identifierElements");

var _identifierElements2 = _interopRequireDefault(_identifierElements);

var _otherElements = require("./otherElements");

var _otherElements2 = _interopRequireDefault(_otherElements);

var _statementElements = require("./statementElements");

var _statementElements2 = _interopRequireDefault(_statementElements);

var _declarationElements = require("./declarationElements");

var _declarationElements2 = _interopRequireDefault(_declarationElements);

var _classElements = require("./classElements");

var _classElements2 = _interopRequireDefault(_classElements);

var _parserElements = require("./parserElements");

var _parserElements2 = _interopRequireDefault(_parserElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ElementTypes = [_nodeElements2.default, _programElements2.default, _functionElements2.default, _patternElements2.default, _expressionElements2.default, _templateElements2.default, _literalElements2.default, _identifierElements2.default, _otherElements2.default, _statementElements2.default, _declarationElements2.default, _classElements2.default, _parserElements2.default];
var BasicElements = ElementTypes.reduce(function (accumulator, CurrentClass) {
  return CurrentClass(accumulator);
}, Object);
exports.default = BasicElements;
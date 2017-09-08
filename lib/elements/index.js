"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeElements = require("./nodeElements");

var _nodeElements2 = _interopRequireDefault(_nodeElements);

var _patternElements = require("./patternElements");

var _patternElements2 = _interopRequireDefault(_patternElements);

var _expressionElements = require("./expressionElements");

var _expressionElements2 = _interopRequireDefault(_expressionElements);

var _literalElements = require("./literalElements");

var _literalElements2 = _interopRequireDefault(_literalElements);

var _identifierElements = require("./identifierElements");

var _identifierElements2 = _interopRequireDefault(_identifierElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasicElements = (0, _identifierElements2.default)((0, _literalElements2.default)((0, _expressionElements2.default)((0, _patternElements2.default)((0, _nodeElements2.default)()))));
exports.default = BasicElements;
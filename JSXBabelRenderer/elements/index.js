import Nodes from './nodeElements'
import Patterns from './patternElements'
import Expressions from './expressionElements'
import Literals from './literalElements'
import Identifiers from './identifierElements'
import Others from './otherElements'
import Statements from './statementElements.js'

const ElementTypes = [Nodes, Patterns, Expressions, Literals, Identifiers, Others, Statements]
const BasicElements = ElementTypes.reduce((accumulator, CurrentClass) => CurrentClass(accumulator), Object)

export default BasicElements;
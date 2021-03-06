import Nodes from './nodeElements'
import Programs from './programElements'
import Functions from './functionElements'
import Patterns from './patternElements'
import Expressions from './expressionElements'
import Templates from './templateElements'
import Literals from './literalElements'
import Identifiers from './identifierElements'
import Others from './otherElements'
import Statements from './statementElements'
import Declarations from './declarationElements'
import Classes from './classElements'
import Parser from './parserElements'

const ElementTypes = [ 
    Nodes,      Programs,     Functions, 
    Patterns,   Expressions,  Templates,
    Literals,   Identifiers,  Others, 
    Statements, Declarations, Classes,
    Parser
]
const BasicElements = ElementTypes.reduce((accumulator, CurrentClass) => CurrentClass(accumulator), Object)

export default BasicElements;
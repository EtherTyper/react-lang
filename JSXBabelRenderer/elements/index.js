import Nodes from './nodeElements'
import Patterns from './patternElements'
import Expressions from './expressionElements'
import Literals from './literalElements'
import Identifiers from './identifierElements'
import Others from './otherElements'

const BasicElements = Others(Identifiers(Literals(Expressions(Patterns(Nodes())))))

export default BasicElements;
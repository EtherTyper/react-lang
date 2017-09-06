import Nodes from './nodeElements'
import Expressions from './expressionElements'
import Literals from './literalElements'
import Identifiers from './identifierElements'

const BasicElements = Identifiers(Literals(Expressions(Nodes())))

export default BasicElements;
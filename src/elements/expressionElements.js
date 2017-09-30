import React from 'react'
import { generateAST } from '..';

const Expressions = (Super = Object) => class BasicElements extends Super {
    static expression(element, props, children) {
        return generateAST(<node {...props} />);
    }

    static super(element, props, children) {
        return generateAST(<node type="Super" />);
    }

    static import(element, props, children) {
        return generateAST(<node type="Import" />);
    }
    
    static thisExpression(element, props, children) {
        return generateAST(<expression type="ThisExpression" />);
    }

    static arrowFunction(element, props, children) {
        let [ body ] = children;

        let params = props.params;
        let async = typeof props.async === 'boolean' ? props.async : false;
        let expression = body.type !== 'BlockStatement';

        return {
            // Generator functions can't be defined using arrow function syntax in ECMAScript.
            // See https://stackoverflow.com/questions/27661306/can-i-use-es6s-arrow-function-syntax-with-generators-arrow-notation.
            ...generateAST(<function {...props} type="ArrowFunctionExpression" id={null} generator={false} async={async} body={expression ? null : body} />),
            ...generateAST(<expression {...props} type="ArrowFunctionExpression" />),
            body,
            expression
        }
    }

    static yield(element, props, children) {
        let delegate = typeof props.delegate === 'boolean' ? props.delegate : false;
        let [ argument = null ] = children;

        return {
            ...generateAST(<expression type="YieldExpression" />),
            argument,
            delegate
        };
    }

    static await(element, props, children) {
        let [ argument = null ] = children;

        return {
            ...generateAST(<expression type="AwaitExpression" />),
            argument
        };
    }

    static arrayExpression(element, props, children) {
        let elements = children;

        return {
            ...generateAST(<expression type="ArrayExpression" />),
            elements
        };
    }

    static objectExpression(element, props, children) {
        let properties = children;

        return {
            ...generateAST(<expression type="ObjectExpression" />),
            properties
        }
    }
    
    static objectMember(element, props, children) {
        let key = props.objectKey;
        let decorators = props.decorators;

        let computed = typeof props.computed === 'boolean' ? props.computed : false;

        return {
            ...generateAST(<node type={props.type} />),
            key,
            computed,
            decorators
        }
    }

    static objectProperty(element, props, children) {
        let shorthand = typeof props.shorthand === 'boolean' ? props.shorthand : false;

        let decorators = children.filter((child) => child.type === 'Decorator');
        let [ key, value ] = children.filter((child) => child.type !== 'Decorator');

        if (shorthand && !value) {
            value = key;
        }

        return {
            ...generateAST(<objectMember {...props} type="ObjectProperty" objectKey={key} decorators={decorators} />),
            shorthand,
            value
        }
    }

    static objectMethod(element, props, children) {
        let decorators = children.filter((child) => child.type === 'Decorator');
        let [ key, body ] = props.children.filter((child, index) => children[index].type !== 'Decorator');

        let id = props.id || null;
        let params = props.params;
        let generator = typeof props.generator === 'boolean' ? props.generator : false;
        let async = typeof props.async === 'boolean' ? props.async : false;
        let kind = props.kind || 'get';

        return {
            ...generateAST(<objectMember {...props} type="ObjectMethod" objectKey={generateAST(key)} decorators={decorators} />),
            ...generateAST(
                <function type="ObjectMethod" id={id} params={params} generator={generator} async={async}>
                    {body}
                </function>
            ),
            kind
        }
    }

    static functionExpression(element, props, children) {
        return {
            ...generateAST(<function {...props} type="FunctionExpression" />),
            ...generateAST(<expression {...props} type="FunctionExpression" />)
        }
    }

    static unary(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : 'typeof';
        let prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        let [ argument ] = children;

        return {
            ...generateAST(<expression type="UnaryExpression" />),
            operator,
            prefix,
            argument
        };
    }

    static update(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '--';
        let prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        let [ argument ] = children;

        return {
            ...generateAST(<expression type="UpdateExpression" />),
            operator,
            prefix,
            argument
        };
    }

    static binary(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : 'instanceof';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="BinaryExpression" />),
            operator,
            left,
            right
        };
    }

    static assignmentExpression(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '>>>=';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="AssignmentExpression" />),
            operator,
            left,
            right
        };
    }

    static logical(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '||';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="LogicalExpression" />),
            operator,
            left,
            right
        };
    }

    static spread(element, props, children) {
        let [ argument ] = children;

        return {
            ...generateAST(<node type="SpreadElement" />),
            argument
        }
    }

    static member(element, props, children) {
        let [ object, property ] = children;

        let computed = typeof props.computed === 'boolean' ? props.computed : false;
        let optional = typeof props.optional === 'boolean' ? props.optional : null;

        return {
            ...generateAST(<expression type="MemberExpression" />),
            ...generateAST(<pattern type="MemberExpression" />),
            object,
            property,
            computed,
            optional
        }
    }

    static bind(element, props, children) {
        let [ callee, object = null ] = children.reverse();

        return {
            ...generateAST(<expression type="BindExpression" />),
            object,
            callee
        };
    }

    static conditional(element, props, children) {
        let [ test, consequent, alternate ] = children;

        return {
            ...generateAST(<expression type="ConditionalExpression" />),
            test,
            alternate,
            consequent
        };
    }

    static call(element, props, children) {
        let optional = typeof props.optional === 'boolean' ? props.optional : null;
        let [ callee, ...callArguments ] = children;

        return {
            ...generateAST(<expression type={ props.type || "CallExpression" } />),
            callee,
            arguments: callArguments,
            optional
        };
    }

    static new(element, props, children) {
        return generateAST(
            <call {...props} type="NewExpression" />
        );
    }

    static sequence(element, props, children) {
        let expressions = children;

        return {
            ...generateAST(<expression type="SequenceExpression" />),
            expressions
        };
    }

    static do(element, props, children) {
        let [ body ] = children;

        return {
            ...generateAST(<expression type="DoExpression" />),
            body
        }
    }
}

export default Expressions;
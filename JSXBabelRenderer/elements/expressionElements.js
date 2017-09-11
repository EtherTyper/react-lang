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

    static yield(element, props, children) {
        let delegate = typeof props.delegate === 'boolean' ? props.delegate : false;
        let [ argument = null ] = children;

        return {
            ...generateAST(<expression type="YieldExpression" />),
            argument: argument,
            delegate: delegate
        };
    }

    static await(element, props, children) {
        let [ argument = null ] = children;

        return {
            ...generateAST(<expression type="AwaitExpression" />),
            argument: argument
        };
    }

    static arrayExpression(element, props, children) {
        let elements = children;

        return {
            ...generateAST(<expression type="ArrayExpression" />),
            elements: elements
        };
    }

    static unary(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : 'typeof';
        let prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        let [ argument ] = children;

        return {
            ...generateAST(<expression type="UnaryExpression" />),
            operator: operator,
            prefix: prefix,
            argument: argument
        };
    }

    static update(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '--';
        let prefix = typeof props.prefix === 'boolean' ? props.prefix : false;
        let [ argument ] = children;

        return {
            ...generateAST(<expression type="UpdateExpression" />),
            operator: operator,
            prefix: prefix,
            argument: argument
        };
    }

    static binary(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : 'instanceof';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="BinaryExpression" />),
            operator: operator,
            left: left,
            right: right
        };
    }

    static assignmentExpression(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '>>>=';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="AssignmentExpression" />),
            operator: operator,
            left: left,
            right: right
        };
    }

    static logical(element, props, children) {
        let operator = typeof props.operator === 'string' ? props.operator : '||';
        let [ left, right ] = children;

        return {
            ...generateAST(<expression type="LogicalExpression" />),
            operator: operator,
            left: left,
            right: right
        };
    }

    static bind(element, props, children) {
        let [ callee, object = null ] = children.reverse();

        return {
            ...generateAST(<expression type="BindExpression" />),
            object: object,
            callee: callee
        };
    }

    static conditional(element, props, children) {
        let [ test, consequent, alternate ] = children;

        return {
            ...generateAST(<expression type="ConditionalExpression" />),
            test: test,
            alternate: alternate,
            consequent: consequent
        };
    }

    static call(element, props, children) {
        let optional = typeof props.optional === 'boolean' ? props.optional : null;
        let [ callee, ...callArguments ] = children;

        return {
            ...generateAST(<expression type={ props.type || "CallExpression" } />),
            callee: callee,
            arguments: callArguments,
            optional: optional
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
            expressions: expressions
        };
    }
}

export default Expressions;
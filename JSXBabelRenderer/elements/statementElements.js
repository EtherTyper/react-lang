import React from 'react'
import { generateAST } from '..';

const Statements = (Super = Object) => class BasicElements extends Super {
    static statement(element, props, children) {
        return generateAST(<node {...props} />);
    }

    static expressionStatement(element, props, children) {
        let [ expression ] = children;

        return {
            ...generateAST(<statement type="ExpressionStatement" />),
            expression: expression
        };
    }

    static blockStatement(element, props, children) {
        let body = children.filter((child) => child.type !== 'Directive');
        let directives = children.filter((child) => child.type === 'Directive');

        return {
            ...generateAST(<statement type="BlockStatement" />),
            body: body,
            directives: directives
        };
    }

    static emptyStatement(element, props, children) {
        return generateAST(<statement {...props} type="EmptyStatement" />);
    }

    static debuggerStatement(element, props, children) {
        return generateAST(<statement {...props} type="DebuggerStatement" />);
    }

    static withStatement(element, props, children) {
        let [ object, body ] = children;
        
        return {
            ...generateAST(<statement {...props} type="WithStatement" />),
            object: object,
            body: body
        };
    }

    static returnStatement(element, props, children) {
        let [ argument = null ] = children;
        
        return {
            ...generateAST(<statement {...props} type="ReturnStatement" />),
            argument: argument
        };
    }

    static labeledStatement(element, props, children) {
        let [ label, body ] = children;
        
        return {
            ...generateAST(<statement {...props} type="LabeledStatement" />),
            label: label,
            body: body
        };
    }

    static breakStatement(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement {...props} type="BreakStatement" />),
            label: label
        };
    }

    static continueStatement(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement {...props} type="ContinueStatement" />),
            label: label
        };
    }
}

export default Statements;
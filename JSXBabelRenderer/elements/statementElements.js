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

    static block(element, props, children) {
        let body = children.filter((child) => child.type !== 'Directive');
        let directives = children.filter((child) => child.type === 'Directive');

        return {
            ...generateAST(<statement type="BlockStatement" />),
            body: body,
            directives: directives
        };
    }

    static empty(element, props, children) {
        return generateAST(<statement type="EmptyStatement" />);
    }

    static debugger(element, props, children) {
        return generateAST(<statement type="DebuggerStatement" />);
    }

    static with(element, props, children) {
        let [ object, body ] = children;
        
        return {
            ...generateAST(<statement type="WithStatement" />),
            object: object,
            body: body
        };
    }

    static return(element, props, children) {
        let [ argument = null ] = children;
        
        return {
            ...generateAST(<statement type="ReturnStatement" />),
            argument: argument
        };
    }

    static label(element, props, children) {
        let [ label, body ] = children;
        
        return {
            ...generateAST(<statement type="LabeledStatement" />),
            label: label,
            body: body
        };
    }

    static break(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement type="BreakStatement" />),
            label: label
        };
    }

    static continue(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement type="ContinueStatement" />),
            label: label
        };
    }

    static if(element, props, children) {
        let [ test, consequent, alternate = null ] = children;

        return {
            ...generateAST(<statement type="IfStatement" />),
            test: test,
            alternate: alternate,
            consequent: consequent
        };
    }

    static switch(element, props, children) {
        let [ discriminant, ...cases ] = children;

        return {
            ...generateAST(<statement type="SwitchStatement" />),
            discriminant: discriminant,
            cases: cases
        };
    }

    static case(element, props, children) {
        let [ test, ...consequent ] = children;

        if (test.type === 'NullLiteral') {
            test = null;
        }

        return {
            ...generateAST(<node type="SwitchCase" />),
            test: test,
            consequent: consequent
        };
    }

    static default(element, props, children) {
        return generateAST(
            <case>
                <null />
                {props.children}
            </case>
        );
    }
}

export default Statements;
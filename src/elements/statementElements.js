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
            expression
        };
    }

    static block(element, props, children) {
        let body = children.filter((child) => child.type !== 'Directive');
        let directives = children.filter((child) => child.type === 'Directive');

        return {
            ...generateAST(<statement type="BlockStatement" />),
            body,
            directives
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
            object,
            body
        };
    }

    static return(element, props, children) {
        let [ argument = null ] = children;
        
        return {
            ...generateAST(<statement type="ReturnStatement" />),
            argument
        };
    }

    static label(element, props, children) {
        let [ label, body ] = children;
        
        return {
            ...generateAST(<statement type="LabeledStatement" />),
            label,
            body
        };
    }

    static break(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement type="BreakStatement" />),
            label
        };
    }

    static continue(element, props, children) {
        let [ label = null ] = children;
        
        return {
            ...generateAST(<statement type="ContinueStatement" />),
            label
        };
    }

    static if(element, props, children) {
        let [ test, consequent, alternate = null ] = children;

        return {
            ...generateAST(<statement type="IfStatement" />),
            test,
            alternate,
            consequent
        };
    }

    static switch(element, props, children) {
        let [ discriminant, ...cases ] = children;

        return {
            ...generateAST(<statement type="SwitchStatement" />),
            discriminant,
            cases
        };
    }

    static case(element, props, children) {
        let [ test, ...consequent ] = children;

        if (test.type === 'NullLiteral') {
            test = null;
        }

        return {
            ...generateAST(<node type="SwitchCase" />),
            test,
            consequent
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

    static throw(element, props, children) {
        let [ argument ] = children;

        return {
            ...generateAST(<statement type="ThrowStatement" />),
            argument
        }
    }

    static try(element, props, children) {
        let [ block ] = children;

        let handler = props.handler ? generateAST(props.handler) : null;
        let finalizer = props.finalizer ? generateAST(props.finalizer) : null;

        return {
            ...generateAST(<statement type="TryStatement" />),
            block,
            handler,
            finalizer
        }
    }

    static catch(element, props, children) {
        let [ body, param = null ] = children.reverse();

        return {
            ...generateAST(<node type="CatchClause" />),
            param,
            body
        }
    }

    static while(element, props, children) {
        let [ test, body ] = children;

        return {
            ...generateAST(<statement type="WhileStatement" />),
            test,
            body
        }
    }

    static doWhile(element, props, children) {
        let [ body, test ] = children;

        return {
            ...generateAST(<statement type="DoWhileStatement" />),
            body,
            test
        }
    }

    static for(element, props, children) {
        let [ body ] = children;

        let init = props.init ? generateAST(props.init) : null;
        let test = props.test ? generateAST(props.test) : null;
        let update = props.update ? generateAST(props.update) : null;

        return {
            ...generateAST(<statement type="ForStatement" />),
            init,
            test,
            update,
            body
        }
    }

    static forIn(element, props, children) {
        let [ body ] = children;

        let left = generateAST(props.left || <number />);
        let right = generateAST(props.right || <number />);

        return {
            ...generateAST(<statement type={props.type || "ForInStatement"} />),
            left,
            right,
            body
        }
    }

    static forOf(element, props, children) {
        let isAwait = props.await || false;

        return {
            ...generateAST(<forIn {...props} type="ForOfStatement" />),
            await: isAwait
        }
    }
}

export default Statements;
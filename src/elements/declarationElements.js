import React from 'react';
import { generateAST } from '..';

const Declarations = (Super = Object) => class BasicElements extends Super {
    static declaration(element, props, children) {
        return generateAST(<expression {...props} />);
    }

    static functionDeclaration(element, props, children) {
        return {
            ...generateAST(<function {...props} />),
            ...generateAST(<declaration type="FunctionDeclaration" />)
        }
    }

    static variableDeclaration(element, props, children) {
        let declarations = children;
        let kind = props.kind || 'let';

        return {
            ...generateAST(<declaration type="VariableDeclaration" />),
            declarations,
            kind
        }
    }

    static variableDeclarator(element, props, children) {
        let [ id, init = null ] = children;

        return {
            ...generateAST(<node type="VariableDeclarator" />),
            id,
            init
        }
    }
}

export default Declarations;
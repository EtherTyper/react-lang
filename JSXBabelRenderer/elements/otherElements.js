import React from 'react'
import { generateAST } from '..';

const Others = (Super = Object) => class BasicElements extends Super {
    static decorator(element, props, children) {
        let [ expression ] = children;

        return {
            ...generateAST(<node type="Decorator" />),
            expression: expression
        };
    }

    static directive(element, props, children) {
        let [ value ] = children;

        return {
            ...generateAST(<node type="Directive" />),
            value: value
        };
    }

    static directiveLiteral(element, props, children) {
        return generateAST(
            <string {...props} type="DirectiveLiteral" />
        );
    }
}

export default Others;
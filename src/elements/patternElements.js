import React from 'react'
import { generateAST } from '..';

const Patterns = (Super = Object) => class BasicElements extends Super {
    static pattern(element, props, children) {
        return generateAST(<node {...props} />);
    }

    static assignmentProperty(element, props, children) {
        let [ key, value ] = children.filter((child) => child.type !== 'Decorator');

        return {
            ...generateAST(<objectProperty {...props} />),
            value
        }
    }

    static objectPattern(element, props, children) {
        let properties = children;

        return {
            ...generateAST(<pattern type="ObjectPattern" />),
            properties
        };
    }

    static arrayPattern(element, props, children) {
        let elements = children.map((child) => do {
            if (child.type === 'NullLiteral') {
                null
            } else {
                child
            }
        });

        return {
            ...generateAST(<pattern type="ArrayPattern" />),
            elements
        };
    }

    static restElement(element, props, children) {
        let [ argument ] = children;

        return {
            ...generateAST(<pattern type="RestElement" />),
            argument
        }
    }

    static assignmentPattern(element, props, children) {
        let [ left, right ] = children;

        return {
            ...generateAST(<pattern type="AssignmentPattern" />),
            left,
            right
        };
    }
}

export default Patterns;
import React from 'react'
import { generateAST } from '..';

const Templates = (Super = Object) => class BasicElements extends Super {
    static templateLiteral(element, props, children) {
        let quasis = children.filter((child, index) => index % 2 === 0);
        let expressions = children.filter((child, index) => index % 2 === 1);

        return {
            ...generateAST(<expression type="TemplateLiteral" />),
            quasis,
            expressions
        }
    }

    static taggedTemplate(element, props, children) {
        let [ tag, quasi ] = children;

        return {
            ...generateAST(<expression type="TaggedTemplateExpression" />),
            tag,
            quasi
        }
    }

    static templateElement(element, props, children) {
        let tail = typeof props.tail === 'boolean' ? props.tail : false;
        let raw = 'PHRPRHRUBHRBRRHPHGH';

        if (typeof props.raw === 'string') {
            raw = props.raw;
        } else if (children[0].type === "StringLiteral") {
            raw = children.shift().value;
        }
        
        let cooked = null;

        if (typeof props.cooked === 'undefined') {
            cooked = raw;
        } else if (props.cooked) {
            cooked = prop.cooked;
        }

        return {
            ...generateAST(<node type="TemplateElement" />),
            tail,
            value: {
                cooked,
                raw
            }
        }
    }
}

export default Templates;
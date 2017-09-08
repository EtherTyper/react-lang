import React from 'react'
import { generateAST } from '..';

const Identifiers = (Super = Object) => class BasicElements extends Super {
    static identifier(element, props, children) {
        let name = '';

        if (typeof props.name === 'string') {
            name = props.name;
        } else if (children[0].type === "StringLiteral") {
            name = children.shift().value;
        }

        return {
            ...generateAST(<expression type="Identifier" />),
            ...generateAST(<pattern type="Identifier" />),
            name: name
        };
    }

    // Doesn't work yet for some reason.
    static privateName(element, props, children) {
        let id = {};

        if (typeof props.name === 'string') {
            id = generateAST(
                <identifier>
                    {props.name}
                </identifier>
            );
        } else if (children[0]) {
            if (children[0].type === "StringLiteral") {
                id = generateAST(
                    <identifier>
                        {children.shift().value}
                    </identifier>
                );
            } else if (children[0].type === "Identifier") {
                id = children.shift();
            } 
        } else {
            throw TypeError("Must supply identifier for private name.");
        }

        return {
            ...generateAST(<expression type="PrivateName" />),
            ...generateAST(<pattern type="PrivateName" />),
            id: id
        };
    }
}

export default Identifiers;
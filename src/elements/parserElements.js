import React from 'react'
import { generateAST } from '..';

const Parser = (Super = Object) => class BasicElements extends Super {
    static parse(element, props, children) {
        let babylon = props.babylon;

        if (babylon) {
            let [ code ] = children;
            let ast = babylon.parse(code.value).program;
            let handler = props.handler || ((program) => program);

            return handler(ast);
        } else {
            throw new TypeError("Babylon instance not supplied.");
        }
    }
}

export default Parser;
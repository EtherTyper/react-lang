import React from 'react'
import { generateAST } from '..';

const Functions = (Super = Object) => class BasicElements extends Super {
    static function(element, props, children) {
        let [ body ] = children;

        let id = props.id ? generateAST(props.id) : null;
        let params = props.params.map(generateAST);
        let generator = typeof props.generator === 'boolean' ? props.generator : false;
        let async = typeof props.async === 'boolean' ? props.async : false;

        return {
            ...generateAST(<node {...props} />),
            id,
            params,
            body,
            generator,
            async
        }
    }
}

export default Functions;
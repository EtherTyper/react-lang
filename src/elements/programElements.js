import React from 'react'
import { generateAST } from '..';

const Programs = (Super = Object) => class BasicElements extends Super {
    static program(element, props, children) {
        let body = children.filter((child) => child.type !== 'Directive');
        let directives = children.filter((child) => child.type === 'Directive');

        let sourceType = props.sourceType || 'module';

        return {
            ...generateAST(<node {...props} type="Program" />),
            sourceType,
            body,
            directives
        }
    }
}

export default Programs;
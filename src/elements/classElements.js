import React from 'react';
import { generateAST } from '..';

const Classes = (Super = Object) => class BasicElements extends Super {
    static classBody(element, props, children) {
        let body = children;

        return {
            ...generateAST(<node type="ClassBody" />),
            body
        }
    }

    static classMethod(element, props, children) {
        let decorators = children.filter((child) => child.type === 'Decorator');
        let [ key, body ] = props.children.filter((child, index) => children[index].type !== 'Decorator');

        let id = props.id || null;
        let params = props.params;
        let generator = typeof props.generator === 'boolean' ? props.generator : false;
        let async = typeof props.async === 'boolean' ? props.async : false;
        let computed = typeof props.computed === 'boolean' ? props.computed : false;
        let isStatic = typeof props.static === 'boolean' ? props.static : false;

        // TODO: Once babel-generator uses 'constructor' instead of 'init', like their AST specification
        // suggests they do, remove the first part of this line. Babel is (awesomely) always on the run...
        let kind = props.kind === 'constructor' ? 'init' : props.kind || 'get';
        
        return {
            ...generateAST(
                <function type="ClassMethod" id={id} params={params} generator={generator} async={async}>
                    {body}
                </function>
            ),
            key: generateAST(key),
            kind,
            computed,
            static: isStatic,
            decorators
        }
    }
}

export default Classes;
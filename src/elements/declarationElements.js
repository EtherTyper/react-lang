import React from 'react';
import { generateAST } from '..';
import 'babel-polyfill';

const Declarations = (Super = Object) => class BasicElements extends Super {
    static declaration(element, props, children) {
        return generateAST(<expression {...props} />);
    }

    static functionDeclaration(element, props, children) {
        let [ body ] = props.children;

        let id = props.id;
        let params = props.params;
        let generator = typeof props.generator === 'boolean' ? props.generator : false;
        let async = typeof props.async === 'boolean' ? props.async : false;

        return {
            ...generateAST(
                <function {...props} type="FunctionDeclaration" id={id} generator={generator} async={async}>
                    {body}
                </function>
            ),
            ...generateAST(<declaration {...props} type="FunctionDeclaration" />)
        }
    }
}

export default Declarations;
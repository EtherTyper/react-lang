const React = require('react');

const { reduce, generateAST, flatten, render } = require('./JSXBabelRenderer');
const HelloGenerator = ({name, children}) => (
    <string>
        Hello {name}! {children}
    </string>
);

const functionalElement = (
    <HelloGenerator name="Linda">
        Yo!
        {' '}
        <HelloGenerator name="Bob" />
    </HelloGenerator>
);

console.log(render(/lo+l/g));
console.log(render(null));
console.log(render('Hello world'));
console.log(render(5));
console.log(render(false));
console.log(render(functionalElement));
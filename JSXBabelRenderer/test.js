import React from 'react';
import { reduce, generateAST, flatten, render } from '.';

const HelloGenerator = ({name, children}) => (
    <string>
        Hello {name}!
        {children ? [' ', ...children] : ''}
        {/* Only add space if children come after. */}
    </string>
);

const functionalElement = (
    <HelloGenerator name="Linda">
        Yo!
        {' '}
        <HelloGenerator name="Bob" />
    </HelloGenerator>
);

function testElement(element, description) {
    description = description || reduce(element).type
    description = description.charAt(0).toUpperCase() + description.slice(1)

    console.log(`${description}: ${render(element)}`)
}

// Literals
testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false);

// Identifiers
testElement(<identifier>helloWorld</identifier>);
// testElement(<privateName>helloIlluminati</privateName>);

testElement(functionalElement, 'Functional element');
import React from 'react';
import { render, reduce, generateAST } from '.';

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

    try {
        console.log(`${description}: ${render(element)}`);
    } catch (exception) {
        process.stdout.write('\u001B[1;31m');
        console.log(`${description}: ${exception}`);
        process.stdout.write('\u001B[0m');
        console.log(`Generated AST for ${description}: ${JSON.stringify(generateAST(reduce(element)), null, 2)}`);
    }
}

// Literals
testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false);

// Identifiers
testElement(<identifier>helloWorld</identifier>);
testElement(<privateName>helloIlluminati</privateName>);

testElement(functionalElement, 'Functional element');
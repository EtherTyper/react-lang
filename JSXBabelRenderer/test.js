import React from 'react';
import { render, reduceToTree, generateAST } from '.';

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
    description = description || reduceToTree(element).type;
    description = description.charAt(0).toUpperCase() + description.slice(1);

    try {
        console.log(`${description}: ${render(element)}`);
    } catch (exception) {
        process.stdout.write('\u001B[1;31m'); // Red and bold.
        console.log(`${description}: ${exception}`);
        process.stdout.write('\u001B[0m'); // Resets font.
        try {
            console.log(`Generated AST for ${description}: ${JSON.stringify(generateAST(element), null, 2)}`);
        } catch {
            try {
                console.log(`Reduced element tree for ${description}: ${JSON.stringify(reduceToTree(element), null, 2)}`);
            } catch {
                console.log(`Raw JSX component for ${description}: ${JSON.stringify(element, null, 2)}`);
            }
        }
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

// Expressions
testElement(
    <array>
        <await>
            <yield delegate={true}>
                <super />
            </yield>
        </await>
        <updateExpression operator="--" prefix={false}>
            <thisExpression />
        </updateExpression>
        <unaryExpression operator="+" prefix={true}>
            <import />
        </unaryExpression>
        <binaryExpression operator="===">
            {5}
            {4}
        </binaryExpression>
    </array>, 'Array of (pseudo)-Expressions'
);

// Functional (User-defined) Components
testElement(functionalElement, 'Functional Element');
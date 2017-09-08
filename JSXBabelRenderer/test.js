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
testElement(<super />);
testElement(<import />);
testElement(<thisExpression />);
testElement(<yield delegate={true}>{3}</yield>);
testElement(<await>{3}</await>);
testElement(
    <array>
        {3}
        {4}
        {5}
    </array>
);
testElement(<unary operator="+" prefix={false}>{3}</unary>);
testElement(
    <update operator="--" prefix={false}>
        <identifier>helloWorld</identifier>
        {4}
    </update>
);
testElement(
    <binary operator="===">
        {3}
        {4}
    </binary>
);
testElement(
    <assignment operator=">>>=">
        <identifier>helloWorld</identifier>
        {4}
    </assignment>
);
testElement(
    <logical operator="||">
        {3}
        {4}
    </logical>
);
testElement(
    <bind>
        <identifier>world</identifier>
        <identifier>sayHello</identifier>
    </bind>
);
testElement(
    <conditional>
        {3}
        {4}
        {5}
    </conditional>
);
testElement(
    <call optional={true}>
        <identifier>hello</identifier>
        <identifier>world</identifier>
        What's up world?
    </call>
);
testElement(
    <new>
        <identifier>Hello</identifier>
        <identifier>world</identifier>
        What's up world?
    </new>
);
testElement(
    <sequence>
        {3}
        {4}
        {5}
    </sequence>
);

// Functional (User-defined) Components
testElement(functionalElement, 'Functional Element');
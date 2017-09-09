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
        console.log(`${description}: ${exception.stack}`);
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

function elementSection(description) {
    description = description.charAt(0).toUpperCase() + description.slice(1);

    process.stdout.write('\n\u001B[1;34m'); // Green and bold and prints new line.
    console.log(`${description} Components`);
    process.stdout.write('\u001B[0m\n'); // Resets font and prints new line.
}

elementSection('literal');
testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false);

elementSection('identifier');
testElement(<identifier>helloWorld</identifier>);
testElement(<privateName>helloIlluminati</privateName>);

elementSection('expression');
testElement(<super />);
testElement(<import />);
testElement(<thisExpression />);
testElement(<yield delegate={true}>{3}</yield>);
testElement(<await>{3}</await>);
testElement(
    <arrayExpression>
        {3}
        {4}
        {5}
    </arrayExpression>
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
    <assignmentExpression operator=">>>=">
        <identifier>helloWorld</identifier>
        {4}
    </assignmentExpression>
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

elementSection('pattern');
testElement(
    <arrayPattern>
        <identifier>hello</identifier>
        <identifier>world</identifier>
        <identifier>object</identifier>
    </arrayPattern>
);
testElement(
    <restElement>
        <identifier>helloWorld</identifier>
    </restElement>
);
testElement(
    <assignmentPattern>
        <identifier>helloWorld</identifier>
        {4}
    </assignmentPattern>
);

elementSection('miscellaneous');
testElement(
    <decorator>
        <identifier>helloWorld</identifier>
    </decorator>
);
testElement(
    <directive>
        <directiveLiteral>use helloWorld</directiveLiteral>
    </directive>
);

// Functional (User-defined) Components
elementSection('special');
testElement(functionalElement, 'Functional Element');
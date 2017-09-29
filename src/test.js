import React from 'react';
import Convert from 'ansi-to-html';
import intercept from "intercept-stdout";
import { render, reduceToTree, generateAST } from '.';
import ReactDOMServer from 'react-dom/server'
import { promisify } from 'util';
import cleanStacktrace from 'clean-stacktrace';
import fs from 'fs';
import path from 'path';

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

function testElement(element, description = null) {
    description = description || reduceToTree(element).type;
    description = description.charAt(0).toUpperCase() + description.slice(1);

    try {
        let producedCode = render(element);

        if (!producedCode.includes('\n')) {
            console.log(`${description}: ${producedCode}`);
        } else {
            let formattedCode = '\n  ' + producedCode.split('\n').join('\n  '); // Double space master-race
            console.log(`${description}: ${formattedCode}`);
        }
    } catch (exception) {
        process.stdout.write('\u001B[1;31m'); // Red and bold.
        if (process.env.DEBUG) {
            const stack = cleanStacktrace(exception.stack, (line) => {
                const paths = /.*\((.*)\).?/.exec(line) || []
                return paths[1] ? line.replace(paths[1], path.relative(process.cwd(), paths[1])) : line
            })

            console.log(`${description}: ${stack}`);
        } else {
            console.log(`${description}: ${exception}`);
        }
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

let testOutput = ''

intercept(function(text) {
    testOutput += text
})

elementSection('program');
testElement(
    <program sourceType="script">
        <expressionStatement>
            {3}
        </expressionStatement>
        <directive>
            <directiveLiteral>use helloWorld</directiveLiteral>
        </directive>
    </program>
);

elementSection('literal');
testElement(/lo+l/g);
testElement(null);
testElement('Hello world');
testElement(5);
testElement(false);

elementSection('identifier');
testElement(<identifier>helloWorld</identifier>);
testElement(<privateName>helloIlluminati</privateName>);

elementSection('statement');
testElement(
    <expressionStatement>
        {3}
    </expressionStatement>
);
testElement(
    <block>
        <expressionStatement>
            {3}
        </expressionStatement>
        <directive>
            <directiveLiteral>use helloWorld</directiveLiteral>
        </directive>
    </block>
);
testElement(<empty />);
testElement(<debugger />);
testElement(
    <with>
        <identifier>World</identifier>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
            </call>
        </expressionStatement>
    </with>
);
testElement(
    <return>
        {3}
    </return>
);
testElement(
    <label>
        <identifier>codeLocation</identifier>
        <debugger />
    </label>
);
testElement(
    <break>
        <identifier>codeLocation</identifier>
    </break>
);
testElement(
    <continue>
        <identifier>codeLocation</identifier>
    </continue>
);
testElement(
    <if>
        {3}
        <expressionStatement>
            <call>
                <identifier>helloWorld</identifier>
            </call>
        </expressionStatement>
        <expressionStatement>
            <call>
                <identifier>goodbyeWorld</identifier>
            </call>
        </expressionStatement>
    </if>
);
testElement(
    <switch>
        <identifier>number</identifier>
        <case>
            {3}
            <debugger />
        </case>
        <default>
            <debugger />
        </default>
    </switch>
)
testElement(
    <case>
        {3}
        <debugger />
    </case>
);
testElement(
    <default>
        <debugger />
    </default>
);
testElement(
    <throw>
        {3}
    </throw>
);
testElement(
    <catch>
        <identifier>error</identifier>
        <block>
            <debugger />
        </block>
    </catch>
);
testElement(
    <try handler={
        <catch>
            <identifier>error</identifier>
            <block>
                <debugger />
            </block>
        </catch>
    }
    
    finalizer={
        <block>
            <debugger />
        </block>
    }>
        <block>
            <expressionStatement>
                <call>
                    <null />
                    <identifier>helloWorld</identifier>
                </call>
            </expressionStatement>
        </block>
    </try>
);
testElement(
    <while>
        {3}
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
            </call>
        </expressionStatement>
    </while>
);
testElement(
    <doWhile>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
            </call>
        </expressionStatement>
        {3}
    </doWhile>
);
testElement(
    <for init={
        <variableDeclaration>
            <variableDeclarator>
                <identifier>i</identifier>
                {0}
            </variableDeclarator>
        </variableDeclaration>
    }
    
    test={
        <binary operator="<=">
            <identifier>i</identifier>
            {10}
        </binary>
    }
    
    update={
        <update operator="++" prefix={false}>
            <identifier>i</identifier>
        </update>
    }>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
            </call>
        </expressionStatement>
    </for>
);
testElement(
    <forIn left={<identifier>index</identifier>} right={[3, 4, 5]}>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
                <identifier>index</identifier>
            </call>
        </expressionStatement>
    </forIn>
);
testElement(
    <forOf left={<identifier>number</identifier>} right={[3, 4, 5]} await>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
                <identifier>number</identifier>
            </call>
        </expressionStatement>
    </forOf>
);

elementSection('declaration');
testElement(
    <functionDeclaration id={<identifier>helloWorld</identifier>} generator={true} async={true} params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <block>
            <debugger />
        </block>
    </functionDeclaration>
);
testElement(
    <variableDeclaration kind="const">
        <variableDeclarator>
            <identifier>greeting</identifier>
        </variableDeclarator>
        <variableDeclarator>
            <identifier>initializedGreeting</identifier>
            Hello world!
        </variableDeclarator>
    </variableDeclaration>
);
testElement(
    <variableDeclarator>
        <identifier>greeting</identifier>
    </variableDeclarator>, 'Empty VariableDeclarator'
);
testElement(
    <variableDeclarator>
        <identifier>greeting</identifier>
        Hello world!
    </variableDeclarator>
);

elementSection('expression');
testElement(<super />);
testElement(<import />);
testElement(<thisExpression />);
testElement(
    <arrowFunction id={<identifier>helloWorld</identifier>} async={true} params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <block>
            <debugger />
        </block>
    </arrowFunction>, 'Block ArrowFunction'
);
testElement(
    <arrowFunction id={<identifier>helloWorld</identifier>} async={true} params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <call>
            <identifier>hello</identifier>
            <identifier>world</identifier>
            What's up world?
        </call>
    </arrowFunction>, 'Expression ArrowFunction'
);
testElement(<yield delegate={true}>{3}</yield>);
testElement(<await>{3}</await>);
testElement([3, 4, 5], 'arrayExpression');
testElement(
    <objectExpression>
        <objectProperty shorthand={true}>
            <identifier>hello</identifier>
            <identifier>hello</identifier>
        </objectProperty>
        <objectProperty computed={true}>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>hello</identifier>
            <identifier>world</identifier>
        </objectProperty>
        <objectMethod computed={true} id={<identifier>helloWorld</identifier>} generator={true} async={true} kind="set" params={
            [
                <arrayPattern>
                    <identifier>hello</identifier>
                    <identifier>world</identifier>
                    <identifier>object</identifier>
                </arrayPattern>
            ]
        }>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>hello</identifier>
            <block>
                <debugger />
            </block>
        </objectMethod>
        <spread>
            <identifier>toExtend</identifier>
        </spread>
    </objectExpression>
);
testElement(
    <objectProperty shorthand={true}>
        <identifier>hello</identifier>
        <identifier>hello</identifier>
    </objectProperty>, 'Shorthand ObjectProperty'
);
testElement(
    <objectProperty computed={true}>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>hello</identifier>
        <identifier>world</identifier>
    </objectProperty>, 'Computed ObjectProperty'
);
testElement(
    <objectMethod computed={true} id={<identifier>helloWorld</identifier>} generator={true} async={true} kind="set" params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>hello</identifier>
        <block>
            <debugger />
        </block>
    </objectMethod>
);
testElement(
    <functionExpression id={<identifier>helloWorld</identifier>} generator={true} async={true} params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <block>
            <debugger />
        </block>
    </functionExpression>
);
testElement(<unary operator="+" prefix={false}>{3}</unary>);
testElement(
    <update operator="--" prefix={false}>
        <identifier>helloWorld</identifier>
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
    <spread>
        <identifier>toExtend</identifier>
    </spread>
);
testElement(
    <member computed={true} optional={true}>
        <identifier>world</identifier>
        <identifier>sayHello</identifier>
    </member>
)
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
testElement(
    <do>
        <block>
            <if>
                <identifier>condition</identifier>
                <expressionStatement>
                    {3}
                </expressionStatement>
                <expressionStatement>
                    {4}
                </expressionStatement>
            </if>
        </block>
    </do>
);

elementSection('templateLiteral');
testElement(
    <templateLiteral>
        <templateElement>
            <string>
                One plus two is
                {' '}
            </string>
        </templateElement>
        <binary operator='+'>
            {1}
            {2}
        </binary>
        <templateElement tail={true}>
            .
        </templateElement>
    </templateLiteral>
);
testElement(
    <taggedTemplate>
        <member>
            <identifier>String</identifier>
            <identifier>soRawASkilledVetCouldStillSaveIt</identifier>
        </member>
        <templateLiteral>
            <templateElement>
                <string>
                    One plus two is
                    {' '}
                </string>
            </templateElement>
            <binary operator='+'>
                {1}
                {2}
            </binary>
            <templateElement tail={true}>
                .
            </templateElement>
        </templateLiteral>
    </taggedTemplate>
);

process.stdout.write('\u001B[1;33m');
console.log(`TemplateElement: These require information about their parents${'\n'
            }to generate, and therefore cannot be tested individually.`);
process.stdout.write('\u001B[0m');

elementSection('pattern');
testElement(
    <assignmentProperty computed={true}>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>hello</identifier>
        <restElement>
            <identifier>world</identifier>
        </restElement>
    </assignmentProperty>
);
testElement(
    <objectPattern>
        <assignmentProperty computed={true}>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>hello</identifier>
            <restElement>
                <identifier>world</identifier>
            </restElement>
        </assignmentProperty>
        <restElement>
            <identifier>helloWorld</identifier>
        </restElement>
    </objectPattern>
)
testElement(
    <arrayPattern>
        <identifier>hello</identifier>
        <identifier>world</identifier>
        {[null, null, null, null] /* Gotta have dose element-skipping commas */}
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

elementSection('class');
testElement(
    <classBody>
        <classMethod id={<identifier>constructor</identifier>} generator={true} kind="constructor" params={
            [
                <arrayPattern>
                    <identifier>hello</identifier>
                    <identifier>world</identifier>
                    <identifier>object</identifier>
                </arrayPattern>
            ]
        }>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>constructor</identifier>
            <block>
                <debugger />
            </block>
        </classMethod>
        <classMethod id={<identifier>helloWorld</identifier>} computed={true} static={true} async={true} kind="get" params={
            [
                <arrayPattern>
                    <identifier>hello</identifier>
                    <identifier>world</identifier>
                    <identifier>object</identifier>
                </arrayPattern>
            ]
        }>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>helloWorld</identifier>
            <block>
                <debugger />
            </block>
        </classMethod>
        <classProperty static={true} computed={true}>
            <identifier>hello</identifier>
            <identifier>world</identifier>
        </classProperty>
    </classBody>
);
testElement(
    <classMethod id={<identifier>constructor</identifier>} generator={true} kind="constructor" params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>constructor</identifier>
        <block>
            <debugger />
        </block>
    </classMethod>, 'Constructor ClassMethod'
);
testElement(
    <classMethod id={<identifier>helloWorld</identifier>} computed={true} static={true} async={true} kind="get" params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>helloWorld</identifier>
        <block>
            <debugger />
        </block>
    </classMethod>
);
testElement(
    <classPrivateMethod id={<privateName>helloWorld</privateName>} generator={true} static={true} async={true} kind="get" params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <identifier>helloWorld</identifier>
        <block>
            <debugger />
        </block>
    </classPrivateMethod>
);
testElement(
    <classProperty static={true} computed={true}>
        <identifier>hello</identifier>
        <identifier>world</identifier>
    </classProperty>
);
testElement(
    <classPrivateProperty static={true}>
        <privateName>hello</privateName>
        <identifier>world</identifier>
    </classPrivateProperty>
);
testElement(
    <classDeclaration id={<identifier>Greeter</identifier>} superClass={<identifier>AbstractGreeter</identifier>}>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <classBody>
            <classMethod id={<identifier>constructor</identifier>} generator={true} kind="constructor" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>constructor</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classMethod id={<identifier>helloWorld</identifier>} computed={true} static={true} async={true} kind="get" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>helloWorld</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classProperty static={true} computed={true}>
                <identifier>hello</identifier>
                <identifier>world</identifier>
            </classProperty>
        </classBody>
    </classDeclaration>
);
testElement(
    <classExpression id={<identifier>Greeter</identifier>} superClass={<identifier>AbstractGreeter</identifier>}>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <classBody>
            <classMethod id={<identifier>constructor</identifier>} generator={true} kind="constructor" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>constructor</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classMethod id={<identifier>helloWorld</identifier>} computed={true} static={true} async={true} kind="get" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>helloWorld</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classProperty static={true} computed={true}>
                <identifier>hello</identifier>
                <identifier>world</identifier>
            </classProperty>
        </classBody>
    </classExpression>
);
testElement(
    <metaProperty>
        <identifier>hello</identifier>
        <identifier>world</identifier>
    </metaProperty>
);

// Features that I added
elementSection('special');
testElement(functionalElement, 'Functional Element'); // User-defined components

(async function() {
    testElement(
        <parse babylon={await import('babylon')}>
            <string>
                const babel = react = {'{'}
                    awesome: true
                }
            </string>
        </parse>, 'ParsedElement'
    );

    testElement(
        <parse babylon={await import('babylon')} handler={
            (ast) => {
                // The initial value of the first variable declared in the first statement of the program body.
                return ast.body[0].declarations[0].init
            }
        }>
            <string>
                const babel = react = {'{'}
                    awesome: true
                }
            </string>
        </parse>, 'Selective ParsedElement'
    );
    
    await promisify(fs.writeFile)('./docs/test.html', 
        ReactDOMServer.renderToStaticMarkup(
            <html>
                <body>
                    <pre style={{overflow: 'auto', padding: '10px 15px', fontFamily: 'monospace'}}>
                        <h1>
                            Complete List of React-Lang Components
                        </h1>
                        <h3>
                            NOTE: This is just the compiled output. To see the JSX code used to construct <br />
                            these elements, please see src/test.js. To see the current progress and what <br />
                            JavaScript features I've yet to implement, see the checklist in spec.md.
                        </h3>

                        <div dangerouslySetInnerHTML={{__html: (new Convert()).toHtml(testOutput)}} />
                    </pre>
                </body>
            </html>
        )
    );
})();
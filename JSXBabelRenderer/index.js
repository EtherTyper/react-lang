import React from 'react'
import generate from 'babel-generator'
import BasicElements from './elements'
import 'babel-polyfill'

export function reduceToTree(element) {
    if (element instanceof RegExp) {
        return (
            <regExp value={element} />
        );
    } else if (element === null) {
        return (
            <null />
        );
    } else if (typeof element === 'string') {
        return (
            <string value={element} />
        );
    } else if (typeof element === 'boolean') {
        return (
            <boolean value={element} />
        );
    } else if (typeof element === 'number') {
        return (
            <number value={element} />
        );
    } else if (Array.isArray(element)) {
        return element.map(reduceToTree);
    } else if (typeof element === 'undefined') {
        return undefined;
    } else if (typeof element.type === 'function') {
        return reduceToTree(element.type(element.props));
    }

    let reducedChildren = [];

    if (Array.isArray(element.props.children)) {
        reducedChildren = element.props.children.map(reduceToTree);
    } else if (element !== null) {
        reducedChildren = [reduceToTree(element.props.children)];
    }

    const flattenedChildren = flatten(reducedChildren);

    return {
        ...element,
        props: {
            ...element.props,
            children: flattenedChildren
        }
    };
}

export function flatten(array) {
    return array.reduce(function (accumulator, currentValue) {
        let currentValueArray = [];
        
        if (Array.isArray(currentValue)) {
            currentValueArray = flatten(currentValue);
        } else if (typeof currentValue !== 'undefined') {
            currentValueArray = [currentValue];
        }

        return [...accumulator, ...currentValueArray];
    }, []);
}

export const keyGenerator = (function* keyed(start) {
    let key = start;

    while (true) yield `ReactLang Element ${key++}`;
})(0)

export function generateASTFromTree(element) {
    if (Array.isArray(element)) {
        return generateAST(
            <arrayExpression>
                {element.map((element) => {
                    return {
                        ...element,
                        key: keyGenerator.next().value
                    }
                })}
            </arrayExpression>
        );
    }

    let children = [];

    if (Array.isArray(element.props.children)) {
        children = element.props.children.map(generateASTFromTree);
    } else if (typeof element.props.children === 'object') {
        children = [generateASTFromTree(element.props.children)];
    }

    return BasicElements[element.type](element, element.props, children);
}

export const generateAST = (element) => generateASTFromTree(reduceToTree(element));
export const render = (element) => generate(generateAST(element)).code;
export default render;
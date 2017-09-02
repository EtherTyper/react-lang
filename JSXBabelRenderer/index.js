import React from 'react'
import generate from 'babel-generator'
import BasicElements from './elements'

export function reduce(element) {
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
        return element.map(reduce);
    } else if (typeof element === 'undefined') {
        return undefined;
    }

    let executedElement = element;

    while (typeof executedElement.type === 'function') {
        executedElement = element.type(element.props);
    }

    let reducedChildren = [];

    if (Array.isArray(executedElement.props.children)) {
        reducedChildren = executedElement.props.children.map(reduce);
    } else if (element !== null) {
        reducedChildren = [reduce(executedElement.props.children)];
    }

    reducedChildren = flatten(reducedChildren);

    return {
        ...executedElement,
        props: {
            ...executedElement.props,
            children: reducedChildren
        }
    };
}

export function flatten(array) {
    return array.reduce(function (accumulator, currentValue) {
        let currentValueArray;
        
        if (Array.isArray(currentValue)) {
            currentValueArray = flatten(currentValue);
        } else if (typeof currentValue !== 'undefined') {
            currentValueArray = [currentValue];
        } else {
            currentValueArray = [];
        }

        return accumulator.concat(currentValueArray);
    }, []);
}

export function generateAST(element) {
    let children;

    if (Array.isArray(element.props.children)) {
        children = element.props.children.map(generateAST);
    } else if (typeof element.props.children === 'object') {
        children = [generateAST(element.props.children)];
    } else {
        children = [];
    }

    return BasicElements[element.type](element, element.props, children);
}

const render = (element) => generate(generateAST(reduce(element))).code;
export { render };
import generate from 'babel-generator'

const Nodes = (Super = Object) => class BasicElements extends Super {
    static Node = class Node {
        constructor(type, loc) {
            this.type = type;
            this.loc = loc;
        }

        get rendered() {
            return generate(this).code;
        }
    }

    static node(element, props, children) {
        let type = '';
        
        if (typeof props.type === 'string') {
            type = props.type;
        } else if (children[0].type === "StringLiteral") {
            type = children.shift().value;
        }

        let loc = children.shift() || null;

        return new this.Node(type, loc);
    }

    static sourceLocation(element, props, children) {
        let start = children.shift();
        let end = children.shift();
        let source = children.shift().value || null;

        return {
            source,
            start,
            end
        };
    }

    static position(element, props, children) {
        let line = 0;
        let column = 0;

        if (typeof props.line === 'number' && typeof props.column === 'number') {
            line = props.line;
            column = props.column;
        } else if (children) {
            line = children.shift().value;
            column = children.shift().value;
        }

        return {
            line,
            column
        };
    }
}

export default Nodes;
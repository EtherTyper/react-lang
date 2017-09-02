const Literals = (Super = Object) => class BasicElements extends Super {
    static regExp(element, props, children) {
        let value = props.value instanceof RegExp ? props.value : /.+/g;

        let pattern = value.source;
        let flags = value.flags;

        return {
            type: "RegExpLiteral",
            pattern: pattern,
            flags: flags
        };
    }

    static null(element, props, children) {
        return {
            type: "NullLiteral"
        };
    }
    
    static string(element, props, children) {
        let value = props.value || '';

        for (let child of children) {
            if (child.type != "StringLiteral") {
                throw TypeError("Strings can only contain strings");
            }

            value += child.value;
        }

        return {
            type: "StringLiteral",
            value: value
        };
    }

    static boolean(element, props, children) {
        let value = typeof props.value === 'boolean' ? props.value : false;

        return {
            type: "BooleanLiteral",
            value: value
        }
    }

    static number(element, props, children) {
        let value = typeof props.value === 'number' ? props.value : Math.random();

        return {
            type: "NumericLiteral",
            value: value
        };
    }
}

export default Literals;
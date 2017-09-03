const Identifiers = (Super = Object) => class BasicElements extends Super {
    static identifier(element, props, children) {
        let name = '';

        if (props.name) {
            name = props.name;
        } else if (children[0].type === "StringLiteral") {
            name = children[0].value;
        }

        return {
            type: "Identifier",
            name: name
        };
    }

    // Doesn't work yet for some reason.
    static privateName(element, props, children) {
        let id = {};

        if (typeof props.name === 'string') {
            id = this.identifier(null, {
                name: props.name
            }, []);
        } else if (children[0]) {
            if (children[0].type === "StringLiteral") {
                id = this.identifier(null, {
                    name: children[0].value
                }, []);
            } else if (children[0].type === "Identifier") {
                id = children[0];
            } 
        } else {
            throw TypeError("Must supply identifier for private name.");
        }

        return {
            type: "PrivateName",
            id: id
        };
    }
}

export default Identifiers;
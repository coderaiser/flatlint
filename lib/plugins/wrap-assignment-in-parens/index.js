export function replace() {
    return {
        '__a && __b = __c': '__a && (__b = __c)',
    };
}

export function report() {
    return `Wrap the assignment in parentheses after '&&'`;
}

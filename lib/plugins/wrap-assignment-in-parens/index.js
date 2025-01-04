export function report() {
    return `Wrap the assignment in parentheses after '&&'`;
}

export const replace = () => ({
    '__a && __b = __c': '__a && (__b = __c)',
});

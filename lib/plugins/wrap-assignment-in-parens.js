export function replace() {
    return {
        '__ && __ = __': '__ && (__ = __)', // Пример замены с использованием IdentifierName
    };
}

export function report() {
    return `Wrap the assignment in parentheses after '&&'.`;
}

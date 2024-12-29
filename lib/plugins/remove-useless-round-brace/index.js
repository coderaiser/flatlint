export function report() {
    return 'Remove useless round brace';
}

export function replace() {
    return {
        'const __a = __b)': 'const __a = __b',
        'const __a = "__b")': 'const __a = "__b"',
    };
}

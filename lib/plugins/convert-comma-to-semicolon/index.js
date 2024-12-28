export function report() {
    return 'Use semicolon instead of trailing comma';
}

export function replace() {
    return {
        'const __a = __b,': 'const __a = __b;',
    };
}

export function report() {
    return 'Add missing round braces';
}

export function replace() {
    return {
        'if __a > __b': 'if (__a > __b)',
    };
}

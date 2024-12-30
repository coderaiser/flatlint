export function report() {
    return 'Add missing squire brace';
}

export function replace() {
    return {
        '["hello", "world";': '["hello", "world"];',
    };
}

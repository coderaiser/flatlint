export function report() {
    return 'Add missing squire brace';
}

export function replace() {
    return {
        '["hello";': '["hello"];',
        '["hello", "world";': '["hello", "world"];',
    };
}

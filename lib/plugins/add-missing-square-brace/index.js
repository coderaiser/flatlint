export function report() {
    return 'Add missing squire brace';
}

export function replace() {
    return {
        '["__a";': '["__a"];',
        '["__a", "__b";': '["__a", "__b"];',
    };
}

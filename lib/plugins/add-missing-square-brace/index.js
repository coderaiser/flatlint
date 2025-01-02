export function report() {
    return 'Add missing square brace';
}

export function replace() {
    return {
        '[__array;': '[__array];',
    };
}

export function report() {
    return `Replace 'function() =>' with 'function() {' to define a function.`;
}

export const replace = () => ({
    'function __a() => {__body}': 'function __a(__args) {__body}',
});

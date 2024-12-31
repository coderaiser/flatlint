export const report = () => `Add 'const' to 'export'`;

export const replace = () => ({
    'export __a = __b': 'export const __a = __b',
});

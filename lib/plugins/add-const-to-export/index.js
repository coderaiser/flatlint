export const report = () => `Add 'const' to 'export'`;

export const replace = () => ({
    'export __a =': 'export const __a =',
});

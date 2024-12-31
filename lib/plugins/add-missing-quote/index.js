export const report = () => 'Add missing quote';

export const replace = () => ({
    'const __a = "__b;': 'const __a = "__b";',
    '__a("__b)': '__a("__b")',
});

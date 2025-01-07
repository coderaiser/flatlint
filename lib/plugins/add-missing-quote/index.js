export const report = () => 'Add missing quote';

export const match = () => ({
    '__a("__b': (vars, path) => !path.isNextPunctuator(vars.quote),
});

export const replace = () => ({
    'const __a = "__b;': 'const __a = "__b";',
    '__a("__b)': '__a("__b")',
    '__a("__b': '__a("__b")',
});

import {quote} from '#types';

export const report = () => 'Add missing quote';

export const match = () => ({
    '__a("__b': (vars, path) => !path.isNextPunctuator(quote),
});

export const replace = () => ({
    'const __a = "__b;': 'const __a = "__b";',
    '__a("__b)': '__a("__b")',
    '__a("__b': '__a("__b")',
});

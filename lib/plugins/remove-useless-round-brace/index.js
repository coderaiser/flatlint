export const report = () => 'Remove useless round brace';

export const replace = () => ({
    'const __a = __b)': 'const __a = __b',
    'const __a = "__b")': 'const __a = "__b"',
    'from "__b")': 'from "__b"',
});

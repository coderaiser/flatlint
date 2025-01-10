export const report = () => 'Remove useless round brace';

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
});

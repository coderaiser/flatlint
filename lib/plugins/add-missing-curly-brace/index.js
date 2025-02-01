export const report = () => 'Add missing curly brace';

export const replace = () => ({
    '({__args)': '({__args})',
    'const {__a = __expr;': 'const {__a} = __expr;',
});

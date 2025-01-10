import {colon, isPunctuator} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a(__args),': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return false;
        }
        
        return true;
    },
    'let __a = __b,': check,
    'var __a = __b': check,
    'let __a,': check,
    'var __a,': check,
});

export const replace = () => ({
    'from "__a",': 'from "__a";',
    'var __a,': 'var __a;',
    'let __a,': 'let __a;',
    'var __a = __b,': 'var __a = __b;',
    'let __a = __b,': 'let __a = __b;',
    'const __a = __b,': 'const __a = __b;',
    '__a(__args),': '__a(__args);',
    'return __expr,': 'return __expr;',
});

const check = (vars, path) => {
    return path.isNextOperator();
};

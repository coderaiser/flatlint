import {
    colon,
    isKeyword,
    isOneOfKeywords,
    isPunctuator,
    quote,
} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a(__args),': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return false;
        }
        
        return true;
    },
    '__x __a = __b,': check,
    '__x __a,': check,
    'return __expr,': ({}, path) => !path.isNextPunctuator(quote),
});

export const replace = () => ({
    'from "__a",': 'from "__a";',
    '__x __a,': '__x __a;',
    '__x __a = __b,': '__x __a = __b;',
    '__a(__args),': '__a(__args);',
    'return __expr,': 'return __expr;',
});

const check = ({__x}, path) => {
    if (!isOneOfKeywords(__x, ['var', 'let', 'const']))
        return false;
    
    if (!path.isNext())
        return true;
    
    return path.isNextKeyword();
};

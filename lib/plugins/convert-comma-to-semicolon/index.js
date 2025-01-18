import {
    closeRoundBrace,
    closeSquareBrace,
    colon,
    isOneOfKeywords,
    isPunctuator,
    openRoundBrace,
    openSquireBrace,
    quote,
} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a(__args),': (vars, path) => {
        if (path.isNextKeyword())
            return true;
        
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return false;
        }
        
        return true;
    },
    '__x __a = __expr,': check,
    '__x __a,': check,
    'return __expr,': ({__expr}, path) => {
        if (isPunctuator(openRoundBrace, __expr) && !isPunctuator(closeRoundBrace, __expr))
            return false;
        
        if (isPunctuator(openSquireBrace, __expr) && !isPunctuator(closeSquareBrace, __expr))
            return false;
        
        return !path.isNextPunctuator(quote);
    },
});

export const replace = () => ({
    'from "__a",': 'from "__a";',
    '__x __a,': '__x __a;',
    '__x __a = __expr,': '__x __a = __expr;',
    '__a(__args),': '__a(__args);',
    'return __expr,': 'return __expr;',
});

const check = ({__x}, path) => {
    if (!isOneOfKeywords(__x, ['var', 'let', 'const']))
        return false;
    
    if (!path.isNext())
        return true;
    
    if (path.isNextIdentifier('module'))
        return true;
    
    return path.isNextKeyword();
};

import {
    closeCurlyBrace,
    closeRoundBrace,
    closeSquareBrace,
    colon,
    isOneOfKeywords,
    isOneOfPunctuators,
    isPunctuator,
    openCurlyBrace,
    openRoundBrace,
    openSquireBrace,
    quote,
    spread,
} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a(__args),': (vars, path) => {
        const punctuators = [colon, spread];
        
        for (const token of path.getAllPrev()) {
            if (isOneOfPunctuators(token, punctuators))
                return false;
        }
        
        if (path.isNextPunctuator(closeCurlyBrace))
            return true;
        
        return path.isNextKeyword();
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
    '__a.__b = __expr,': (vars, path) => {
        if (path.isPrevPunctuator())
            return false;
        
        return !path.isNextPunctuator([quote, openCurlyBrace]);
    },
    '"__a",': (vars, path) => {
        if (path.isNextPunctuator())
            return false;
        
        return path.isNextKeyword();
    },
});

export const replace = () => ({
    'from "__a",': 'from "__a";',
    '__x __a,': '__x __a;',
    '__x __a = __expr,': '__x __a = __expr;',
    '__a(__args),': '__a(__args);',
    'return __expr,': 'return __expr;',
    '__a.__b = __expr,': '__a.__b = __expr;',
    '"__a",': '"__a";',
});

const check = ({__x}, path) => {
    if (!isOneOfKeywords(__x, ['var', 'let', 'const']))
        return false;
    
    if (!path.isNext())
        return true;
    
    if (path.isNextIdentifier('module'))
        return true;
    
    return path.isNextKeyword() && !path.isNextIdentifier('new');
};

import {
    comma,
    isPunctuator,
    semicolon,
    arrow,
    openCurlyBrace,
    closeRoundBrace,
    question,
    closeCurlyBrace,
    isOnlyWhitespaces,
} from '#types';

export const report = () => 'Add missing semicolon';

export const match = () => ({
    'const __a = __expr': ({__expr}, path) => {
        if (isOnlyWhitespaces(__expr))
            return false;
        
        if (!path.isNext())
            return true;
        
        const punctuators = [
            comma,
            semicolon,
            openCurlyBrace,
            question,
        ];
        
        return !path.isNextPunctuator(punctuators);
    },
    '__a(__args)': (vars, path) => {
        if (path.isNextPunctuator() && !path.isNextPunctuator(closeCurlyBrace))
            return false;
        
        if (path.isInsideTemplate())
            return false;
        
        return !path.isPrevIdentifier('function');
    },
    '})': (vars, path) => {
        const punctuators = [arrow, comma, closeRoundBrace];
        
        if (path.isNextPunctuator(punctuators))
            return false;
        
        return !path.isNextPunctuator([semicolon, openCurlyBrace]);
    },
});

export const replace = () => ({
    'const __a = __expr': 'const __a = __expr;',
    '__a(__args)': '__a(__args);',
    
    '})': '});',
});


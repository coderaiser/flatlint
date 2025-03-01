import {
    comma,
    semicolon,
    arrow,
    openCurlyBrace,
    closeRoundBrace,
    question,
    closeCurlyBrace,
    isOnlyWhitespaces,
    isKeyword,
    openRoundBrace,
    isPunctuator,
    colon,
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
            closeRoundBrace,
            openRoundBrace,
        ];
        
        return !path.isNextPunctuator(punctuators);
    },
    '__a(__args)': (vars, path) => {
        if (path.isNextPunctuator() && !path.isNextPunctuator(closeCurlyBrace))
            return false;
        
        if (path.isInsideTemplate())
            return false;
        
        for (const current of path.getAllPrev()) {
            if (isKeyword(current, 'if'))
                return false;
            
            if (isPunctuator(current, colon))
                return false;
        }
        
        return !path.isPrevIdentifier('function');
    },
    '})': (vars, path) => {
        const punctuators = [
            arrow,
            comma,
            closeRoundBrace,
        ];
        
        if (path.isNextTemplateTail())
            return false;
        
        if (path.isNextPunctuator(punctuators))
            return false;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, colon))
                return false;
            
            if (isKeyword(current, 'const'))
                break;
        }
        
        return !path.isNextPunctuator([semicolon, openCurlyBrace]);
    },
});

export const replace = () => ({
    'const __a = __expr': 'const __a = __expr;',
    '__a(__args)': '__a(__args);',
    '})': '});',
});

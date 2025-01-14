import {
    comma,
    isPunctuator,
    semicolon,
    arrow,
    openCurlyBrace,
    closeRoundBrace,
    dot,
    question,
} from '#types';

export const report = () => 'Add missing semicolon';

export const match = () => ({
    'const __a = __expr': (vars, path) => {
        const punctuators = [
            comma,
            semicolon,
            openCurlyBrace,
            question,
        ];
        
        if (path.isNextPunctuator(punctuators))
            return false;
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, semicolon))
                return false;
        }
        
        return true;
    },
    '__a(__args)': (vars, path) => {
        const punctuators = [
            comma,
            semicolon,
            arrow,
            closeRoundBrace,
            openCurlyBrace,
            dot,
            question,
        ];
        
        if (path.isNextPunctuator(punctuators))
            return false;
        
        if (path.isNextTemplateTail())
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

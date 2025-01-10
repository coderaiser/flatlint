import {
    comma,
    isPunctuator,
    semicolon,
    arrow,
    openCurlyBrace,
} from '#types';

export const report = () => 'Add missing semicolon';

export const match = () => ({
    'const __a = __expr': (vars, path) => {
        if (path.isNextPunctuator(comma))
            return false;
        
        if (path.isNextPunctuator(semicolon))
            return false;
        
        if (path.isNextPunctuator(openCurlyBrace))
            return false;
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, semicolon))
                return false;
        }
        
        return true;
    },
    '__a(__args)': (vars, path) => {
        if (path.isNextPunctuator(comma))
            return false;
        
        if (path.isNextPunctuator(semicolon))
            return false;
        
        if (path.isNextPunctuator(arrow))
            return false;
        
        if (path.isNextPunctuator(openCurlyBrace))
            return false;
        
        return !path.isPrevIdentifier('function');
    },
    '})': (vars, path) => {
        if (path.isNextPunctuator(arrow))
            return false;
        
        if (path.isNextPunctuator(comma))
            return false;
        
        return !path.isNextPunctuator(semicolon);
    },
});

export const replace = () => ({
    'const __a = __expr': 'const __a = __expr;',
    '__a(__args)': '__a(__args);',
    '})': '});',
});

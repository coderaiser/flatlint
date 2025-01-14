import {
    closeRoundBrace,
    isIdentifier,
    isPunctuator,
    openRoundBrace,
    quote,
} from '#types';

export const report = () => 'Add missing round braces';

export const match = () => ({
    '(__args) {': ({__args}, path) => {
        if (!isPunctuator(openRoundBrace, __args))
            return false;
        
        return !isPunctuator(closeRoundBrace, __args);
    },
    '__a(__args': (vars, path) => {
        if (path.isCurrentPunctuator(closeRoundBrace))
            return false;
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, closeRoundBrace))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
    '(__args) {': '(__args)) {',
});

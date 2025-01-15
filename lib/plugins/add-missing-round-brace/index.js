import {
    arrow,
    closeRoundBrace,
    isPunctuator,
    openRoundBrace,
} from '#types';

export const report = () => 'Add missing round brace';

export const match = () => ({
    '(__args) {': ({__args}) => {
        if (isPunctuator(arrow, __args))
            return false;
        
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
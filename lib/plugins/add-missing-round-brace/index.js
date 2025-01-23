import {
    closeRoundBrace,
    isLastPunctuator,
    semicolon,
} from '#types';

export const report = () => 'Add missing round brace';

export const match = () => ({
    '__a(__args': ({__args}, path) => {
        if (isLastPunctuator(__args, semicolon))
            return false;
        
        if (path.isCurrentPunctuator(closeRoundBrace))
            return false;
        
        return !path.isNextPunctuator(closeRoundBrace);
    },
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
    'if (__a.__b(__args) {': 'if (__a.__b(__args)) {',
    'if (__a(__args) {': 'if (__a(__args)) {',
});

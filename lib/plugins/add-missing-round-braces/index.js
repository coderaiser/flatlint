import {
    closeRoundBrace,
    isPunctuator,
} from '#types';

export const report = () => 'Add missing round braces';

export const match = () => ({
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
});

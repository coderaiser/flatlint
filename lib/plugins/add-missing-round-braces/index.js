import {closeRoundBrace} from '#types';

export const report = () => 'Add missing round braces';

export const match = () => ({
    '__a(__args': (vars, path) => !path.isNextPunctuator(closeRoundBrace),
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
});

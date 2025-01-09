import {isPunctuator, openRoundBrace} from '#types';

export const report = () => 'Remove useless round brace';

export const match = () => ({
    'const __a = __expr);': ({__expr}) => {
        const [, brace] = __expr;
        return !isPunctuator(brace, openRoundBrace);
    },
});

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
});

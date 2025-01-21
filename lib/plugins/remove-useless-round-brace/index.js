import {
    closeRoundBrace,
    hasRoundBraces,
    isBalancedRoundBraces,
    isOneOfPunctuators,
    isPunctuator,
    openRoundBrace,
} from '#types';

export const report = () => 'Remove useless round brace';

export const match = () => ({
    'const __a = __expr);': ({__expr}) => {
        if (!hasRoundBraces(__expr))
            return true;
        
        return !isBalancedRoundBraces(__expr);
    },
});

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
});

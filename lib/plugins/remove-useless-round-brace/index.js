import {
    hasRoundBraces,
    isBalancedRoundBraces,
    isPunctuator,
    isRoundBracesBalanced,
    openRoundBrace,
} from '#types';

export const report = () => 'Remove useless round brace';

export const match = () => ({
    'const __a = __expr);': ({__expr}) => {
        if (!hasRoundBraces(__expr))
            return true;
        
        return !isBalancedRoundBraces(__expr);
    },
    
    '__a);': (vars, path) => {
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, openRoundBrace))
                return false;
        }
        
        return true;
    },
    '})': (vars, path) => !isRoundBracesBalanced(path),
    ')]': (vars, path) => isRoundBracesBalanced(path) < 0,
});

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
    '__a);': '__a;',
    '})': '}',
    ')]': ']',
    'for (__a __b of __c))': 'for (__a __b of __c)',
});

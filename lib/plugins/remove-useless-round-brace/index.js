import {
    closeRoundBrace,
    hasRoundBraces,
    isBalancedRoundBraces,
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
    
    '__a);': (vars, path) => {
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, openRoundBrace))
                return false;
        }
        
        return true;
    },
    '})': (vars, path) => {
        let balance = 0;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, openRoundBrace))
                ++balance;
            
            if (isPunctuator(current, closeRoundBrace))
                --balance;
        }
        
        return !balance;
    },
});

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
    '__a);': '__a;',
    '})': '}',
    'for (__a __b of __c))': 'for (__a __b of __c)',
});

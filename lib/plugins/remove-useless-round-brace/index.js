import {
    assign,
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
    
    '__a);': ({__a}, path) => {
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, openRoundBrace))
                return false;
            
            if (isPunctuator(current, assign))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    'const __a = __expr);': 'const __a = __expr;',
    'from "__b")': 'from "__b"',
    '__a);': '__a;',
});


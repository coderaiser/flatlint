import {
    assign,
    isDeclarationKeyword,
    isKeyword,
    isPunctuator,
    semicolon,
} from '#types';

export const report = () => 'Add missing assign';

export const match = () => ({
    '__x __a __expr': ({__expr, __x}) => {
        const [first] = __expr;
        
        if (isKeyword(first))
            return false;
        
        if (!isDeclarationKeyword(__x))
            return false;
        
        return !isPunctuator(assign, __expr);
    },
    '__a.__b __expr': ({__expr}, path) => {
        if (path.isNextPunctuator() && !path.isNextPunctuator(semicolon))
            return false;
        
        return !isPunctuator(assign, __expr);
    },
});

export const replace = () => ({
    '__x __a __expr': '__x __a = __expr',
    '__a.__b __expr': '__a.__b = __expr',
});

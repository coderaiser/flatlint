import {
    and,
    assign,
    isDeclarationKeyword,
    isKeyword,
    isPunctuator,
    plus,
    question,
    semicolon,
} from '#types';

const EXCLUDED = [assign, and, plus];

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
        
        const [first] = __expr;
        
        if (isPunctuator(first, EXCLUDED))
            return false;
        
        return !isPunctuator(question, first);
    },
});

export const replace = () => ({
    '__x __a __expr': '__x __a = __expr',
    '__a.__b __expr': '__a.__b = __expr',
});

import {
    assign,
    isOneOfKeywords,
    isOneOfPunctuators,
} from '#types';

export const report = () => 'Add missing assign';

export const match = () => ({
    '__x __a __expr': ({__expr, __x}, path) => {
        if (path.isNextPunctuator(assign))
            return false;
        
        if (!isOneOfKeywords(__x, ['const', 'let', 'var']))
            return false;
        
        return !isOneOfPunctuators(assign, __expr);
    },
    '__a.__b __expr': ({__expr}) => !isOneOfPunctuators(assign, __expr),
});

export const replace = () => ({
    '__x __a __expr': '__x __a = __expr',
    '__a.__b __expr': '__a.__b = __expr',
});

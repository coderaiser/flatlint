import {
    closeSquareBrace,
    isIdentifier,
    isOneOfKeywords,
    isOneOfPunctuators,
    isPunctuator,
    more,
} from '#types';

export const report = () => `Use ',' instead of ';'`;

export const match = () => ({
    '__a;': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isOneOfKeywords(token, ['readonly', 'static', 'implements']))
                return false;
        }
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, closeSquareBrace))
                return true;
        }
    },
    '__a: __expr;': ({__expr}, path) => {
        for (const token of path.getAllPrev()) {
            if (isOneOfKeywords(token, ['readonly', 'static', 'implements']))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    '__a: __expr;': '__a: __expr,',
    '__a;': '__a,',
});

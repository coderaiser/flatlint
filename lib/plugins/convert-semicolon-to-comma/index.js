import {
    closeCurlyBrace,
    closeSquareBrace,
    colon,
    isOneOfKeywords,
    isPunctuator,
} from '#types';

const keywords = [
    'readonly',
    'static',
    'implements',
    'interface',
    'class',
];

export const report = () => `Use ',' instead of ';'`;

export const match = () => ({
    '__a;': (vars, path) => {
        if (path.isNextKeyword())
            return false;
        
        for (const token of path.getAllPrev()) {
            if (isOneOfKeywords(token, keywords))
                return false;
        }
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, closeSquareBrace))
                return true;
        }
        
        return false;
    },
    '__a: __expr;': (vars, path) => {
        if (path.isPrevDeclarationKeyword())
            return false;
        
        for (const token of path.getAllPrev())
            if (isOneOfKeywords(token, keywords))
                return false;
        
        return true;
    },
    ');': (vars, path) => {
        if (!path.isNext())
            return false;
        
        if (path.isPrevPunctuator(closeCurlyBrace))
            return false;
        
        for (const token of path.getAllPrev()) {
            if (isOneOfKeywords(token, keywords))
                return false;
        }
        
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    '__a: __expr;': '__a: __expr,',
    '__a;': '__a,',
    ');': '),',
});

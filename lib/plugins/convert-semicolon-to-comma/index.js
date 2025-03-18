import {
    closeSquareBrace,
    colon,
    dot,
    isKeyword,
    isOneOfIdentifiers,
    isPunctuator,
    semicolon,
    assign,
    bitwiseAnd,
} from '#types';

const keywords = [
    'readonly',
    'static',
    'implements',
    'interface',
    'class',
    'return',
    'throw',
];

export const report = () => `Use ',' instead of ';'`;

export const match = () => ({
    '__a;': ({__a}, path) => {
        if (isKeyword(__a))
            return false;
        
        if (path.isNextKeyword())
            return false;
        
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, semicolon))
                return false;
            
            if (isOneOfIdentifiers(token, keywords))
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
            if (isOneOfIdentifiers(token, keywords))
                return false;
        
        return true;
    },
    ');': (vars, path) => {
        if (!path.isNext())
            return false;
        
        if (path.isNextKeyword())
            return false;
        
        const isNextCall = path.isNextCompare('__a.__b(');
        
        for (const token of path.getAllPrev()) {
            if (isOneOfIdentifiers(token, keywords))
                return false;
            
            if (isPunctuator(token, [
                assign,
                bitwiseAnd,
                dot,
                semicolon,
                closeSquareBrace,
            ]))
                return false;
            
            if (isPunctuator(token, colon) && !isNextCall)
                return true;
        }
        
        return false;
    },
    '__a];': (vars, path) => {
        return path.isNextPunctuator(closeSquareBrace);
    },
});

export const replace = () => ({
    '__a: __expr;': '__a: __expr,',
    '__a;': '__a,',
    ');': '),',
    '__a];': '__a],',
});

import {
    closeSquareBrace,
    isOneOfKeywords,
    isPunctuator,
} from '#types';

export const report = () => `Use ',' instead of ';'`;

export const match = () => ({
    '__a;': (vars, path) => {
        if (path.isNextKeyword())
            return false;
        
        for (const token of path.getAllPrev()) {
            if (isOneOfKeywords(token, [
                'readonly',
                'static',
                'implements',
                'interface',
            ]))
                return false;
        }
        
        for (const token of path.getAllNext()) {
            if (isPunctuator(token, closeSquareBrace))
                return true;
        }
    },
    '__a: __expr;': (vars, path) => {
        if (path.isPrevDeclarationKeyword())
            return false;
        
        const keywords = [
            'class',
            'readonly',
            'static',
            'implements',
        ];
        
        for (const token of path.getAllPrev())
            if (isOneOfKeywords(token, keywords))
                return false;
        
        return true;
    },
});

export const replace = () => ({
    '__a: __expr;': '__a: __expr,',
    '__a;': '__a,',
});

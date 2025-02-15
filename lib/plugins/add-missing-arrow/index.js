import {
    colon,
    isIdentifier,
    isKeyword,
    isOneOfKeywords,
    isPunctuator,
    openCurlyBrace,
} from '#types';

export const report = () => `Add missing '=>'`;

export const match = () => ({
    '(__args) {': (vars, path) => {
        const current = path.getPrev();
        
        if (isOneOfKeywords(current, ['if', 'function']))
            return false;
        
        if (isIdentifier(current))
            return false;
        
        for (const token of path.getAllPrev()) {
            if (isKeyword(token, 'class'))
                return false;
        }
        
        if (isPunctuator(current, colon))
            return true;
        
        return !isPunctuator(current, openCurlyBrace);
    },
});
export const replace = () => ({
    '(__args) {': '(__args) => {',
    ') = ({': ') => ({',
});

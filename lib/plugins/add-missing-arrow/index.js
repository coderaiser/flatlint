import {
    colon,
    isIdentifier,
    isOneOfIdentifiers,
    isPunctuator,
    openCurlyBrace,
} from '#types';

export const report = () => `Add missing '=>'`;

export const match = () => ({
    '(__args) {': (vars, path) => {
        const current = path.getPrev();
        
        if (isOneOfIdentifiers(current, ['if', 'function']))
            return false;
        
        if (isIdentifier(current))
            return false;
        
        if (isPunctuator(current, colon))
            return true;
        
        return !isPunctuator(current, openCurlyBrace);
    },
});
export const replace = () => ({
    '(__args) {': '(__args) => {',
    ') = ({': ') => ({',
});

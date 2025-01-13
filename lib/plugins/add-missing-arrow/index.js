import {
    colon,
    isOneOfKeywords,
    isPunctuator,
    openCurlyBrace,
} from '#types';

export const report = () => `Add missing '=>'`;

export const match = () => ({
    '(__args) {': (vars, path) => {
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, colon))
                return true;
            
            if (isPunctuator(current, openCurlyBrace))
                return false;
            
            if (isOneOfKeywords(current, ['if', 'function']))
                return false;
        }
        
        return true;
    },
});
export const replace = () => ({
    '(__args) {': '(__args) => {',
});

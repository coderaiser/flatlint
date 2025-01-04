import {isNewLine, isPunctuator} from '#types';

export const report = () => 'Add missing semicolon';

export const match = () => ({
    'const __a = __expr': (vars, path) => {
        let last;
        
        for (const token of path.getNext()) {
            last = token;
        }
        
        return !isPunctuator(last, ';');
    },
});

export const replace = () => ({
    'const __a = __expr': 'const __a = __expr;',
});

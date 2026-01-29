import {
    closeCurlyBrace,
    closeSquareBrace,
    isSquireBracesBalanced,
} from '#types';

export const report = () => 'Add missing square brace';

export const match = () => ({
    '["__a"': (vars, path) => !path.isNext(),
    ')': (vars, path) => {
        if (path.isNextPunctuator(closeSquareBrace))
            return false;
        
        if (path.isPrevPunctuator(closeCurlyBrace))
            return false;
        
        const balance = isSquireBracesBalanced(path);
        
        return balance > 0;
    },
});
export const replace = () => ({
    '[__array;': '[__array];',
    '["__a"': '["__a"];',
    '[;': '[];',
    ')': '])',
});

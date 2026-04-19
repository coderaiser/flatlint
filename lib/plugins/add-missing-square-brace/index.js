import {
    closeCurlyBrace,
    closeSquareBrace,
    isPunctuator,
} from '#types';

export const report = () => 'Add missing square brace';

export const match = () => ({
    '["__a"': (vars, path) => !path.isNext(),
    '[__array;': ({__array}, path) => {
        const last = __array.at(-1);
        
        if (path.isNextPunctuator(closeSquareBrace))
            return false;
        
        return !isPunctuator(last, closeCurlyBrace);
    },
});
export const replace = () => ({
    '[__array;': '[__array];',
    '[__array};': '[__array]};',
    '["__a"': '["__a"];',
    '[;': '[];',
    '(__a, ["__b")': '(__a, ["__b"])',
    '(__a, ["__b", "__c")': '(__a, ["__b", "__c"])',
    '(__a, [__b)': '(__a, [__b])',
    '(__a, [__b, __c)': '(__a, [__b, __c])',
});

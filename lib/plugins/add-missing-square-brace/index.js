import {
    closeCurlyBrace,
    comma,
    isPunctuator,
    openSquireBrace,
} from '#types';

export const report = () => 'Add missing square brace';

const addIndex = (a, i) => [i, a];

export const match = () => ({
    '["__a"': (vars, path) => !path.isNext(),
    '[__array;': ({__array}) => {
        const last = __array.at(-1);
        return !isPunctuator(last, closeCurlyBrace);
    },
    '"__a",\n}': (vars, path) => {
        const allPrevs = path
            .getAllPrev()
            .map(addIndex);
        
        let is = false;
        
        for (const [i, prev] of allPrevs) {
            const COMMA_POSITION = '\n",'.length;
            
            if (i === COMMA_POSITION) {
                is = isPunctuator(prev, [comma, openSquireBrace]);
                break;
            }
        }
        
        return is;
    },
});
export const replace = () => ({
    '"__a",\n}': '"__a",\n]}',
    '[__array;': '[__array];',
    '["__a"': '["__a"];',
    '[;': '[];',
    '(__a, ["__b")': '(__a, ["__b"])',
    '(__a, ["__b", "__c")': '(__a, ["__b", "__c"])',
    '(__a, [__b)': '(__a, [__b])',
    '(__a, [__b, __c)': '(__a, [__b, __c])',
});


import {
    closeSquareBrace,
    isPunctuator,
    isSquireBracesBalanced,
    openSquireBrace,
} from '#types';

export const report = () => 'Add missing square brace';

export const match = () => ({
    '["__a"': (vars, path) => !path.isNext(),
    ')': (vars, path) => isSquireBracesBalanced(path),
});
export const replace = () => ({
    '[__array;': '[__array];',
    '["__a"': '["__a"];',
    '[;': '[];',
    ')': '])',
});


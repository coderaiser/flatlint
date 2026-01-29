export const report = () => 'Add missing square brace';

export const match = () => ({
    '["__a"': (vars, path) => !path.isNext(),
});
export const replace = () => ({
    '[__array;': '[__array];',
    '["__a"': '["__a"];',
    '[;': '[];',
    '(__a, ["__b")': '(__a, ["__b"])',
    '(__a, ["__b", "__c")': '(__a, ["__b", "__c"])',
    '(__a, [__b)': '(__a, [__b])',
    '(__a, [__b, __c)': '(__a, [__b, __c])',
});

t.transform('declare-imports-first', {
    'declare-imports-first': declareImportsFirst,
    'convert-esm-to-commonjs': convertEsmToCommonJs
});

const {code, places} = await processFile({
    name: 'xxx.js',
    source: `
        const a = b.a
    `,
});

module.exports.replace = () => ({
    't.calledWith(__a, __b)': 't.calledWith(__a, [__b])',
    't.calledWith(__a, [...__b])': 't.calledWith(__a, __b)',
    't.calledWith(__a, [...__b], __c)': 't.calledWith(__a, __b, __c)'
});
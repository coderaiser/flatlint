t.transform('declare-imports-first', {
    'declare-imports-first': declareImportsFirst
    'convert-esm-to-commonjs': convertEsmToCommonJs
});

const {code, places} = await processFile({
    name: 'xxx.js'
    source: `
        const a = b.a
    `,
});
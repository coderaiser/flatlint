module.exports.match = () => ({
    '__a = __b.__a': ({parentPath}) => isExpressionStatement(parentPath);
});

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
});

export const replace = () => ({
    '__a.map((__b) => __c)': (vars, path) => {
        const a = path.get('callee.object');
        const b = path.get('arguments.0.params.0');

        return `for (const ${b} of ${a}) __c`;
    },
});

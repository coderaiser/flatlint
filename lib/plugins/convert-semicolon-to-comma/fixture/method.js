module.exports.match = () => ({
    '__a = __b.__a': ({parentPath}) => isExpressionStatement(parentPath);
});

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
});
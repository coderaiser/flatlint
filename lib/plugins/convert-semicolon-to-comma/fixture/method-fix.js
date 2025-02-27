module.exports.match = () => ({
    '__a = __b.__a': ({parentPath}) => isExpressionStatement(parentPath),
}
export const replace = () => ({
    'module.exports = __a': ({__a}) => {
        return result.join('\n');
    },
    'module.exports.__a = __b': ({__a, __b}, path) => {
    },
});
export const replace = () => ({
    'const __a = __b(require(__c))': ({__a, __b, __c}, path) => {
        const declarationNode = createFnDeclaration({
            NAME1: __a,
        });
    },
});
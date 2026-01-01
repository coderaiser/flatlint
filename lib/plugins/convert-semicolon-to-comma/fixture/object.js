export const replace = () => ({
    'const __a = __b(require(__c))': ({__a, __b, __c}, path) => {
        const declarationNode = createFnDeclaration({
            FN: __b,
        });

        insertBefore(path, [importNode]);
    },
});

export const replace1 = () => ({
    'const __a = __b(require(__c))': ({__a, __b, __c}, path) => {
        const declarationNode = createFnDeclaration({
            FN: __b,
        });
    },
});

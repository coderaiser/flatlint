export const report = () => `Add missing 'const'`;

export const replace = () => ({
    'export {__a, __b, __c} = ': 'export const {__a, __b, __c} = ',
});

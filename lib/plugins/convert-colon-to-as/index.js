export const report = () => `Use 'as' instead of ':'`;
export const replace = () => ({
    'import {__a: __b} from "__c"': 'import {__a as __b} from "__c"',
});

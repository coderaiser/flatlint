export const report = () => `Add 'const' to 'export'`;

export const replace = () => ({
    'import {__a}, __b from "__c"': 'import __b, {__a} from "__c"',
});

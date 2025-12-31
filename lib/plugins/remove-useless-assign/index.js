export const report = () => 'Remove useless assign';

export const replace = () => ({
    'import __a = from "__b"': 'import __a from "__b"',
    'import {__a} = from "__b"': 'import {__a} from "__b"',
    'import {__a, __b} = from "__c"': 'import {__a, __b} from "__c"',
});

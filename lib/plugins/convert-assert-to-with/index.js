export const report = () => `Use 'with' instead of 'assert'`;
export const replace = () => ({
    'import __a from "__b" assert {type: "__c"}': 'import __a from "__b" with {type: "__c"}',
    'import {__a} from "__b" assert {type: "__c"}': 'import {__a} from "__b" with {type: "__c"}',
    'import {__a, __d} from "__b" assert {type: "__c"}': 'import {__a, __d} from "__b" with {type: "__c"}',
});

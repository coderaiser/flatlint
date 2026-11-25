export const report = () => `Remove useless '='`;

export const replace = () => ({
    'import __a = from "__b"': 'import __a from "__b"',
    'import {__a} = from "__b"': 'import {__a} from "__b"',
    'import {__a, __b} = from "__c"': 'import {__a, __b} from "__c"',
    'function __a = (': 'function __a(',
    'const = {': 'const {',
    'const = [': 'const [',
    'let = {': 'let {',
    'let = [': 'let [',
    'var = {': 'var {',
    'var = [': 'var [',
});

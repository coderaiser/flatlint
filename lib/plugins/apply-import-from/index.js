export const report = () => `Use 'import from' instead of 'import form'`;

export const replace = () => ({
    'import __a form "__b"': 'import __a from "__b"',
    'import {__a} form "__b"': 'import {__a} from "__b"',
    'import * as __a form "__b"': 'import * as __a from "__b"',
});

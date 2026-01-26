export const report = () => `Split 'namespace' with 'specifiers'`;

export const replace = () => ({
    'import * as __a, {__b} from "__c"': 'import * as __a from "__c";\nconst {__b} = __a;',
    'import * as __a, {__b, __c} from "__d"': 'import * as __a from "__d";\nconst {__b, __c} = __a;',
    'import * as __a, {__b, __c, __d} from "__e"': 'import * as __a from "__e";\nconst {__b, __c, __d} = __a;',
});

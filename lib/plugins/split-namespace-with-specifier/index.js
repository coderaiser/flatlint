export const report = () => `Split 'namespace' with 'specifier'`;

export const replace = () => ({
    'import * as __a, {__b} from "__c"': 'import * as __a from "__c";\nconst {__b} = __a;',
});

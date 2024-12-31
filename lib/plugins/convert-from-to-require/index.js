export const report = () => `Use 'require' instead of 'from'`;

export const replace = () => ({
    '= from "__a"': '= require("__a")',
});

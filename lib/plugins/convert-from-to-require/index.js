import {isKeyword} from '#types';

export const report = () => `Use 'require' instead of 'from'`;

export const match = () => ({
    '= from "__a"': (vars, path) => {
        for (const current of path.getAllPrev()) {
            if (isKeyword(current, 'import'))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    '= from "__a"': '= require("__a")',
});

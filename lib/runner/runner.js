import {replace} from './replacer.js';

export const run = (tokens, {fix, fixCount = 10, plugins}) => {
    const places = [];
    
    while (--fixCount) {
        for (const {rule, plugin} of plugins) {
            places.push(...replace(tokens, {
                fix,
                rule,
                plugin,
            }));
            
            if (!fix || places.length) {
                fixCount = 1;
                break;
            }
        }
    }
    
    return [places];
};

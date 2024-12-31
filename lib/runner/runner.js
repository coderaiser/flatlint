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
            
            if (places.length)
                return [places];
        }
    }
    
    return [places];
};

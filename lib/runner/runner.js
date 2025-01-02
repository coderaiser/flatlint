import {match, replace} from './replacer.js';

export const run = (tokens, {fix, fixCount = 10, plugins}) => {
    const places = [];
    
    while (--fixCount >= 0) {
        for (const {rule, plugin} of plugins) {
            if (match(tokens, {plugin}))
                places.push(...replace(tokens, {
                    fix,
                    rule,
                    plugin,
                }));
            
            if (!fix) {
                fixCount = 0;
                break;
            }
        }
    }
    
    return [places];
};

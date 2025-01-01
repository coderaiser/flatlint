import {replace} from './replacer.js';

export const run = (tokens, {fix, fixCount = 10, plugins}) => {
    debugger;
    const places = [];
    
    while (--fixCount >= 0) {
        for (const {rule, plugin} of plugins) {
            places.push(...replace(tokens, {
                fix,
                rule,
                plugin,
            }));
            
            if (!fix || places.length) {
                fixCount = 0;
                break;
            }
        }
    }
    
    return [places];
};

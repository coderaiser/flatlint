import {replace} from './replacer.js';

export const run = (tokens, {fix, plugins}) => {
    const places = [];
    
    for (const {rule, plugin} of plugins) {
        places.push(...replace(tokens, {
            fix,
            rule,
            plugin,
        }));
    }
    
    return [places];
};

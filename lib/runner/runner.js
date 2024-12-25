import {replace} from './replacer.js';

export const run = (tokens, {fix, plugins}) => {
    const places = [];
    
    for (const plugin of plugins) {
        places.push(...replace(tokens, {
            fix,
            plugin,
        }));
    }
    
    return [places];
};

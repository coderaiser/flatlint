import {replace} from './replacer.js';

export const run = (tokens, {fix, fixCount = fix ? 10 : 1, plugins}) => {
    const places = [];
    
    while (--fixCount >= 0) {
        const fixed = [];
        
        for (const {rule, plugin} of plugins) {
            const [isFixed, newPlaces] = replace(tokens, {
                fix,
                rule,
                plugin,
            });
            
            fixed.push(isFixed);
            places.push(...newPlaces);
        }
        
        if (!fixed.filter(Boolean).length)
            break;
    }
    
    return places;
};

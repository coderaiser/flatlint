import {compare} from '../compare/compare.js';

const {entries} = Object;

export const run = (tokens, {plugins}) => {
    const places = [];
    
    for (const plugin of plugins) {
        places.push(...replacer(tokens, {
            plugin,
        }));
    }
    
    return [places];
};

function replacer(tokens, {plugin}) {
    const places = [];
    
    for (const [from] of entries(plugin.replace())) {
        const [ok, start] = compare(tokens, from);
        
        if (ok)
            places.push({
                message: plugin.report(),
                line: tokens[start].line,
                column: tokens[start].column,
            });
    }
    
    return places;
}

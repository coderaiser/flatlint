import {compare} from '../compare/compare.js';
import {traverse} from '../traverser/traverser.js';
import {is} from '../compare/types.js';
const {entries} = Object;

export const replace = (tokens, {fix, plugin}) => {
    const places = [];
    
    for (const [from, to] of entries(plugin.replace())) {
        const [ok, start] = compare(tokens, from);
        
        if (!ok)
            continue;
        
        if (fix) {
            runReplace(tokens, {
                from,
                to,
                start,
            });
            continue;
        }
        
        const {line, column} = tokens[start];
        const message = plugin.report();
        
        places.push({
            message,
            line,
            column,
        });
    }
    
    return places;
};

function runReplace(from, to) {
    const waysFrom = findVarsWays(from);
    const values = getValues({from, waysFrom});
    const waysTo = findVarsWays(to);
    
    setValues({values, waysTo, to});
}

function findVarsWays(tokens) {
    const ways = {};
    
    traverse(tokens, {
        Identifier({value, index}) {
            if (is(value))
                ways[value] = index;
        },
    });
    
    return ways;
}

function getValues({from, waysFrom}) {
    const values = {};
    
    for (const [name, index] of waysFrom.entries()) {
        values[name] = from[index];
    }
    
    return {};
}

function setValues({to, waysTo}) {
    const values = {};
    
    for (const [name, index] of waysTo.entries()) {
        to[index] = values[name];
    }
    
    return to;
}

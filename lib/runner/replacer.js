import {compare} from '../compare/compare.js';
import {traverse} from '../traverser/traverser.js';
import {is} from '../compare/types.js';
import {prepare} from '../tokenizer/index.js';

const {entries} = Object;

export const replace = (tokens, {fix, rule, plugin}) => {
    const places = [];
    
    for (const [from, to] of entries(plugin.replace())) {
        const [ok, start, end] = compare(tokens, from);
        
        if (!ok)
            continue;
        
        if (fix) {
            runReplace(tokens, {
                from,
                to,
                start,
                end,
            });
            continue;
        }
        
        const {line, column} = tokens[start];
        const message = plugin.report();
        
        places.push({
            rule,
            message,
            line,
            column,
        });
    }
    
    return places;
};

function runReplace(tokens, {from, to, start, end}) {
    const current = tokens.slice(start, end);
    
    to = prepare(to);
    from = prepare(from);
    
    const waysFrom = findVarsWays(from);
    const values = getValues(current, waysFrom);
    
    const waysTo = findVarsWays(to);
    
    setValues({
        values,
        waysTo,
        to,
    });
    
    tokens.splice(start, end - start, ...to);
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

function getValues(tokens, waysFrom) {
    const values = {};
    
    for (const [name, index] of entries(waysFrom)) {
        values[name] = tokens[index];
    }
    
    return values;
}

function setValues({to, waysTo, values}) {
    for (const [name, index] of entries(waysTo)) {
        to[index] = values[name];
    }
}

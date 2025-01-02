import {compare} from '#compare';
import {prepare} from '#parser';
import {traverse} from '#traverser';
import {
    is,
    isTemplateArray,
    isTemplateExpression,
} from '#types';
import {collectArray} from '../compare/collect-array.js';
import {collectExpression} from '../compare/collect-expression.js';
import {createPath} from './path.js';

const returns = (a) => () => a;
const {entries} = Object;

export const match = (tokens, {plugin}) => {
    const match = plugin.match ?? returns([]);
    
    for (const [from, fn] of entries(match())) {
        const [ok, start, end] = compare(tokens, from);
        
        if (!ok)
            continue;
        
        const current = tokens.slice(start, end);
        
        const waysFrom = findVarsWays(prepare(from));
        const values = getValues(current, waysFrom);
        
        return fn(values, createPath({
            tokens,
            start,
            end,
        }));
    }
    
    return true;
};

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
        StringLiteral({value, index}) {
            if (is(value))
                ways[value] = index;
        },
    });
    
    return ways;
}

function getValues(tokens, waysFrom) {
    const values = {};
    
    for (const [name, index] of entries(waysFrom)) {
        let end = index;
        
        if (isTemplateArray(name))
            end = collectArray({
                currentTokenIndex: index,
                tokens,
            });
        else if (isTemplateExpression(name))
            end = collectExpression({
                currentTokenIndex: index,
                tokens,
            });
        
        values[name] = tokens.slice(index, end + 1);
    }
    
    return values;
}

function setValues({to, waysTo, values}) {
    for (const [name, index] of entries(waysTo)) {
        to.splice(index, 1, ...values[name]);
    }
}


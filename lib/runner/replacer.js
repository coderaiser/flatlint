import {compare} from '#compare';
import {prepare} from '#parser';
import {traverse} from '#traverser';
import {
    is,
    isTemplateArray,
    isTemplateExpression,
    Punctuator,
} from '#types';
import {collectArray} from '../compare/collect-array.js';
import {collectExpression} from '../compare/collect-expression.js';

const {isArray} = Array;
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
        if (isTemplateArray(name)) {
            const endOfArray = collectArray({
                currentTokenIndex: index,
                tokens,
                nextTemplateToken: Punctuator(';'),
            });
            
            if (index === endOfArray) {
                values[name] = tokens[index];
                continue;
            }
            
            values[name] = tokens.slice(index, endOfArray + 1);
            continue;
        }
        
        if (isTemplateExpression(name)) {
            const endOfArray = collectExpression({
                currentTokenIndex: index,
                tokens,
                nextTemplateToken: Punctuator(';'),
            });
            
            if (index === endOfArray) {
                values[name] = tokens[index];
                continue;
            }
            
            values[name] = tokens.slice(index, endOfArray + 1);
            continue;
        }
        
        values[name] = tokens[index];
    }
    
    return values;
}

function setValues({to, waysTo, values}) {
    for (const [name, index] of entries(waysTo)) {
        const current = values[name];
        
        if (!isArray(current)) {
            to[index] = values[name];
            continue;
        }
        
        to.splice(index, 1, ...values[name]);
    }
}

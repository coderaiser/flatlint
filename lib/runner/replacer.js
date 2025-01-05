import {compare} from '#compare';
import {prepare} from '#parser';
import {traverse} from '#traverser';
import {
    is,
    isTemplateArgs,
    isTemplateArray,
    isTemplateExpression,
} from '#types';
import {collectArray} from '../compare/collect-array.js';
import {collectExpression} from '../compare/collect-expression.js';
import {createPath} from './path.js';
import {collectArgs} from '../compare/collect-args.js';

const returns = (a) => () => a;
const {entries} = Object;

export const replace = (tokens, {fix, rule, plugin}) => {
    const places = [];
    let isFixed = false;
    const match = plugin.match?.() ?? returns({});
    
    for (let [from, to] of entries(plugin.replace())) {
        const [ok, start, end] = compare(tokens, from);
        
        if (!ok)
            continue;
        
        const values = getCurrentValues({
            from,
            start,
            end,
            tokens,
        });
        
        const matchFn = match[from];
        
        if (matchFn) {
            const is = matchFn(values, createPath({
                tokens,
                start,
                end,
            }));
            
            if (!is)
                continue;
        }
        
        if (fix) {
            to = prepare(to);
            const waysTo = findVarsWays(to);
            
            setValues({
                values,
                waysTo,
                to,
            });
            
            tokens.splice(start, end - start, ...to);
            isFixed = true;
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
    
    return [isFixed, places];
};

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
        let ok = true;
        
        if (isTemplateArray(name))
            [ok, end] = collectArray({
                currentTokenIndex: index,
                tokens,
            });
        else if (isTemplateExpression(name))
            end = collectExpression({
                currentTokenIndex: index,
                tokens,
            });
        else if (isTemplateArgs(name))
            [ok, end] = collectArgs({
                currentTokenIndex: index,
                tokens,
            });
        
        if (!ok) {
            values[name] = [];
            continue;
        }
        
        values[name] = tokens.slice(index, end + 1);
    }
    
    return values;
}

function setValues({to, waysTo, values}) {
    for (const [name, index] of entries(waysTo)) {
        to.splice(index, 1, ...values[name]);
    }
}

function getCurrentValues({from, start, end, tokens}) {
    const current = tokens.slice(start, end);
    
    const waysFrom = findVarsWays(prepare(from));
    return getValues(current, waysFrom);
}


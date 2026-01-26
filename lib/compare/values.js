import {traverse} from '#traverser';
import {prepare} from '#parser';
import {
    is,
    isTemplateArgs,
    isTemplateArray,
    isTemplateExpression,
} from '#types';
import {collectArray} from './collect-array.js';
import {collectExpression} from './collect-expression.js';
import {collectArgs} from './collect-args.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const {entries} = Object;

const createAddWay = (ways) => ({value, index}) => {
    if (is(value)) {
        ways[value] = ways[value] || [];
        ways[value].push(index);
    }
};

export function findVarsWays(tokens) {
    const ways = {};
    const add = createAddWay(ways);
    
    traverse(tokens, {
        Identifier: add,
        StringLiteral: add,
    });
    
    return ways;
}

export function getValues(tokens, waysFrom) {
    const values = {};
    
    for (const [name, index] of entries(waysFrom)) {
        let end = index;
        let ok = true;
        
        if (isTemplateArray(name)) {
            [ok, end] = collectArray({
                currentTokenIndex: index,
                tokens,
            });
        } else if (isTemplateExpression(name)) {
            end = collectExpression({
                currentTokenIndex: index,
                tokens,
            });
        } else if (isTemplateArgs(name)) {
            [ok, end] = collectArgs({
                currentTokenIndex: index,
                tokens,
            });
        } else {
            values[name] = tokens[index];
            continue;
        }
        
        if (!ok) {
            values[name] = [];
            continue;
        }
        
        values[name] = tokens.slice(index, end + 1);
    }
    
    return values;
}

export function setValues({to, waysTo, values}) {
    const namesWithIndexes = getNamesWithIndexes(waysTo);
    
    for (const [name, index] of namesWithIndexes) {
        const current = maybeArray(values[name]);
        to.splice(index, 1, ...current);
    }
}

export function getCurrentValues({from, start, end, tokens}) {
    const current = tokens.slice(start, end);
    const waysFrom = findVarsWays(prepare(from));
    
    return getValues(current, waysFrom);
}

function getNamesWithIndexes(waysTo) {
    const namesWithIndexes = [];
    
    for (const [name, ways] of entries(waysTo)) {
        for (const index of ways) {
            namesWithIndexes.push([name, index]);
        }
    }
    
    return namesWithIndexes;
}

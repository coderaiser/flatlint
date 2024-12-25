import tokenize from 'js-tokens';
import {
    isIdentifier,
    isNewLine,
    isPunctuator,
    isWhiteSpace,
    notWhiteSpace,
} from './types.js';

const isString = (a) => typeof a === 'string';

const prepare = (a) => {
    if (isString(a))
        return Array.from(tokenize(a));
    
    return a;
};

export const compare = (source, template) => {
    const templateTokens = prepare(template);
    const tokens = prepare(source);
    const n = tokens.length - 1;
    const templateTokensLength = templateTokens.length;
    let isEqual = false;
    
    for (let index = 0; index < n; index++) {
        let tokenDelta = 0;
        let templateDelta = 0;
        
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            if (n <= index + templateIndex)
                break;
            
            const templateToken = templateTokens[templateIndex - templateDelta];
            const current = tokens[index + templateIndex - tokenDelta];
            
            if (isWhiteSpace(current)) {
                ++templateDelta;
                continue;
            }
            
            if (isWhiteSpace(templateToken)) {
                ++tokenDelta;
                continue;
            }
            
            if (isNewLine(current))
                continue;
            
            if (!compareAll(current, templateToken)) {
                isEqual = false;
                break;
            }
            
            isEqual = true;
        }
        
        if (isEqual)
            return [true, index];
    }
    
    return [false];
};

const comparators = [equal, equalId];

function compareAll(a, b) {
    for (const currentCompare of comparators) {
        if (currentCompare(a, b))
            return true;
    }
    
    return false;
}

function equal(a, b) {
    return a.type === b.type && a.value === b.value;
}

function equalId(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return b.value === '__';
}


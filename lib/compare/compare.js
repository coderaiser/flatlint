import tokenize from 'js-tokens';
import {
    isIdentifier,
    isNewLine,
    isPunctuator,
    isWhiteSpace,
    notWhiteSpace,
} from './types.js';

export const compare = (tokens, template) => {
    const templateTokens = Array.from(tokenize(template));
    const n = tokens.length - 1;
    const templateTokensLength = templateTokens.length;
    let isEqual = false;
    
    for (let index = 0; index < n; index++) {
        let delta = 0;
        
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            if (n <= index + templateIndex)
                break;
            
            const templateToken = templateTokens[templateIndex];
            const current = tokens[index + templateIndex - delta];
            
            if (isWhiteSpace(current))
                continue;
            
            if (isWhiteSpace(templateToken)) {
                ++delta;
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


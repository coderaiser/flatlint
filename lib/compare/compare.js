import {prepare} from '../tokenizer/index.js';
import {
    isId,
    isIdentifier,
    isPunctuator,
    isQuote,
    isStringLiteral,
} from './types.js';

export const compare = (source, template) => {
    const templateTokens = prepare(template);
    const tokens = prepare(source);
    
    const n = tokens.length - 1;
    const templateTokensLength = templateTokens.length;
    let isEqual = false;
    let start = 0;
    let end = 0;
    
    for (let index = 0; index < n; index++) {
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            const currentTokenIndex = index + templateIndex;
            
            if (currentTokenIndex > n) {
                isEqual = false;
                break;
            }
            
            const templateToken = templateTokens[templateIndex];
            const currentToken = tokens[currentTokenIndex];
            
            if (!compareAll(currentToken, templateToken)) {
                isEqual = false;
                break;
            }
            
            isEqual = true;
            start = index;
            end = currentTokenIndex;
        }
        
        if (isEqual)
            return [true, start, ++end];
    }
    
    return [false];
};

const comparators = [
    equal,
    equalId,
    equalStr,
    equalAny,
    equalQuote,
];

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

function equalAny(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return b.value === '__';
}

function equalQuote(a, b) {
    if (!isPunctuator(a))
        return false;
    
    return isQuote(b.value);
}

function equalStr(a, b) {
    if (!isStringLiteral(a))
        return false;
    
    return isId(b.value);
}

function equalId(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return isId(b.value);
}

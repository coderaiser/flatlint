import {prepare} from '../tokenizer/index.js';
import {
    isId,
    isIdentifier,
    isNewLine,
    isPunctuator,
    isWhiteSpace,
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
        let tokenDelta = 0;
        let templateDelta = 0;
        
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            const currentTokenIndex = index + templateIndex - tokenDelta;
            
            if (currentTokenIndex === n + 1)
                break;
            
            const templateToken = templateTokens[templateIndex - templateDelta];
            const currentToken = tokens[currentTokenIndex];
            
            if (isWhiteSpace(currentToken)) {
                ++templateDelta;
                continue;
            }
            
            if (isWhiteSpace(templateToken)) {
                ++tokenDelta;
                continue;
            }
            
            if (isNewLine(currentToken))
                continue;
            
            if (!compareAll(currentToken, templateToken)) {
                isEqual = false;
                break;
            }
            
            isEqual = true;
            start = index;
            end = currentTokenIndex + tokenDelta + templateDelta;
        }
        
        if (isEqual)
            return [true, start, ++end];
    }
    
    return [false];
};

const comparators = [
    equal,
    equalId,
    equalAny,
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

function equalId(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return isId(b.value);
}

import {prepare} from '#parser';
import {isTemplateArrayToken} from '#types';
import {compareArrays} from './compare-arrays.js';
import {
    equal,
    equalAny,
    equalId,
    equalQuote,
    equalStr,
} from './equal.js';

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
            
            if (isTemplateArrayToken(templateToken)) {
                const indexOfArrayEnd = compareArrays({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                index = indexOfArrayEnd - templateIndex;
            } else if (!compareAll(currentToken, templateToken)) {
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


import {prepare} from '#parser';
import {
    isTemplateArrayToken,
    isTemplateExpressionToken,
} from '#types';
import {collectArray} from './collect-array.js';
import {collectExpression} from './collect-expression.js';
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
    let delta = 0;
    
    for (let index = 0; index < n; index++) {
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            const currentTokenIndex = index + templateIndex;
            const templateToken = templateTokens[templateIndex];
            const currentToken = tokens[currentTokenIndex];
            
            if (isTemplateExpressionToken(templateToken)) {
                const indexOfExpressionEnd = collectExpression({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                delta = indexOfExpressionEnd - currentTokenIndex;
                index = indexOfExpressionEnd - templateIndex;
            } else if (isTemplateArrayToken(templateToken)) {
                const indexOfArrayEnd = collectArray({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                delta = indexOfArrayEnd - currentTokenIndex;
                index = indexOfArrayEnd - templateIndex;
            } else if (!compareAll(currentToken, templateToken)) {
                isEqual = false;
                break;
            }
            
            isEqual = true;
            start = index - delta;
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

import {prepare} from '#parser';
import {
    isTemplateArgsToken,
    isTemplateArrayToken,
    isTemplateExpressionToken,
    OK,
    NOT_OK,
} from '#types';
import {collectArray} from './collect-array.js';
import {collectExpression} from './collect-expression.js';
import {collectArgs} from './collect-args.js';
import {
    equal,
    equalAny,
    equalId,
    equalQuote,
    equalStr,
} from './equal.js';

export const compare = (source, template, {index = 0} = {}) => {
    const templateTokens = prepare(template);
    const tokens = prepare(source);
    
    const n = tokens.length - 1;
    const templateTokensLength = templateTokens.length;
    let isEqual = false;
    let start = 0;
    let end = 0;
    let delta = 0;
    
    for (; index < n; index++) {
        let skip = 0;
        
        for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
            let currentTokenIndex = index + templateIndex - skip;
            
            const templateToken = templateTokens[templateIndex];
            const currentToken = tokens[currentTokenIndex];
            
            if (isTemplateArgsToken(templateToken)) {
                const [ok, end] = collectArgs({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (!ok) {
                    ++skip;
                } else if (templateIndex === templateTokensLength - 1) {
                    currentTokenIndex = end;
                } else {
                    delta = end - currentTokenIndex;
                    index = end - templateIndex;
                }
            } else if (isTemplateExpressionToken(templateToken)) {
                const indexOfExpressionEnd = collectExpression({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (indexOfExpressionEnd >= n - 1) {
                    end = indexOfExpressionEnd;
                    continue;
                }
                
                delta = indexOfExpressionEnd - currentTokenIndex;
                index = indexOfExpressionEnd - templateIndex;
            } else if (isTemplateArrayToken(templateToken)) {
                const [ok, indexOfArrayEnd] = collectArray({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (!ok) {
                    ++skip;
                } else {
                    delta = indexOfArrayEnd - currentTokenIndex;
                    index = indexOfArrayEnd - templateIndex;
                }
            } else if (!compareAll(currentToken, templateToken)) {
                isEqual = false;
                break;
            }
            
            isEqual = true;
            start = index - delta;
            end = currentTokenIndex;
        }
        
        if (isEqual)
            return [
                OK,
                start,
                ++end,
            ];
    }
    
    return [NOT_OK];
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

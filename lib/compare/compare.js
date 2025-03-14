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
import {equalTemplate} from './equal.js';

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
        const indexCheck = index;
        let skip = 0;
        
        for (const [templateIndex] of templateTokens.entries()) {
            let currentTokenIndex = index + templateIndex - skip;
            
            checkIndexes(index, indexCheck);
            
            if (currentTokenIndex > n)
                return [NOT_OK];
            
            const templateToken = templateTokens[templateIndex];
            const currentToken = tokens[currentTokenIndex];
            
            if (isTemplateArgsToken(templateToken)) {
                const [ok, end] = collectArgs({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                delta = 0;
                
                if (!ok) {
                    ++skip;
                } else if (templateIndex === templateTokensLength - 1) {
                    currentTokenIndex = end;
                } else if (currentTokenIndex < end) {
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
                
                const sameTokensIndex = templateIndex === templateTokensLength - 1;
                const outOfBound = indexOfExpressionEnd >= n;
                
                if (outOfBound || sameTokensIndex) {
                    end = indexOfExpressionEnd;
                    currentTokenIndex = end;
                } else {
                    delta = indexOfExpressionEnd - currentTokenIndex;
                    index = indexOfExpressionEnd - templateIndex;
                }
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
            } else if (!equalTemplate(currentToken, templateToken)) {
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

function checkIndexes(index, indexCheck) {
    /* c8 ignore start */
    if (indexCheck > index + 1)
        throw Error(`index should never decrease more then on one: ${index} > ${indexCheck}`);
    
    if (index < 0)
        throw Error(`index should never be < zero: ${index}`);
    /* c8 ignore end */
}

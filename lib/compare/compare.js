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
    const tokens = prepare(source);
    const templateTokens = prepare(template);
    
    const lastIndex = tokens.length - 1;
    const lastTemplateIndex = templateTokens.length - 1;
    
    for (; index < lastIndex; index++) {
        let skip = 0;
        let start = 0;
        let end = 0;
        let delta = 0;
        let isEqual = true;
        
        for (let templateIndex = 0; templateIndex < templateTokens.length; templateIndex++) {
            const templateToken = templateTokens[templateIndex];
            let currentTokenIndex = index + templateIndex - skip;
            
            checkIndexes(index, index);
            
            if (currentTokenIndex > lastIndex)
                return [NOT_OK];
            
            const currentToken = tokens[currentTokenIndex];
            
            if (isTemplateArgsToken(templateToken)) {
                const [ok, collectedEnd] = collectArgs({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (!ok) {
                    skip++;
                    continue;
                }
                
                if (templateIndex === lastTemplateIndex) {
                    currentTokenIndex = collectedEnd;
                } else if (currentTokenIndex < collectedEnd) {
                    delta = collectedEnd - currentTokenIndex;
                    index = collectedEnd - templateIndex;
                }
            } else if (isTemplateExpressionToken(templateToken)) {
                const collectedEnd = collectExpression({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (collectedEnd >= lastIndex || templateIndex === lastTemplateIndex) {
                    currentTokenIndex = collectedEnd;
                } else {
                    delta = collectedEnd - currentTokenIndex;
                    index = collectedEnd - templateIndex;
                }
            } else if (isTemplateArrayToken(templateToken)) {
                const [ok, collectedEnd] = collectArray({
                    currentTokenIndex,
                    tokens,
                    templateToken,
                    nextTemplateToken: templateTokens[templateIndex + 1],
                });
                
                if (!ok) {
                    skip++;
                    continue;
                }
                
                if (currentTokenIndex < collectedEnd) {
                    delta = collectedEnd - currentTokenIndex;
                    index = collectedEnd - templateIndex;
                }
            } else if (!equalTemplate(currentToken, templateToken)) {
                isEqual = false;
                break;
            }
            
            start = index - delta;
            end = currentTokenIndex;
        }
        
        if (isEqual)
            return [
                OK,
                start,
                end + 1,
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


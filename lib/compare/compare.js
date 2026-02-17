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
    
    const lastTokenIndex = tokens.length - 1;
    const lastTemplateIndex = templateTokens.length - 1;
    
    for (; index < lastTokenIndex; index++) {
        let skip = 0;
        let delta = 0;
        let start = 0;
        let end = 0;
        let isEqual = false;
        
        for (let templateIndex = 0; templateIndex <= lastTemplateIndex; templateIndex++) {
            const templateToken = templateTokens[templateIndex];
            const nextTemplateToken = templateTokens[templateIndex + 1];
            
            let currentTokenIndex = index + templateIndex - skip;
            
            checkIndexes(index, index);
            
            if (currentTokenIndex > lastTokenIndex)
                return [NOT_OK];
            
            const result = matchDynamic({
                templateToken,
                templateIndex,
                lastTemplateIndex,
                currentTokenIndex,
                tokens,
                nextTemplateToken,
                lastTokenIndex,
            });
            
            if (result) {
                if (!result.ok) {
                    skip++;
                    continue;
                }
                
                if (result.shift) {
                    delta = result.end - currentTokenIndex;
                    index = result.end - templateIndex;
                } else {
                    currentTokenIndex = result.end;
                }
            } else {
                const currentToken = tokens[currentTokenIndex];
                
                if (!equalTemplate(currentToken, templateToken)) {
                    isEqual = false;
                    break;
                }
            }
            
            isEqual = true;
            start = index - delta;
            end = currentTokenIndex;
        }
        
        if (isEqual)
            return [OK, start, end + 1];
    }
    
    return [NOT_OK];
};

function matchDynamic({templateToken, templateIndex, lastTemplateIndex, currentTokenIndex, tokens, nextTemplateToken, lastTokenIndex}) {
    const isLastTemplate = templateIndex === lastTemplateIndex;
    
    if (isTemplateArgsToken(templateToken)) {
        const [ok, end] = collectArgs({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        return {
            ok,
            end,
            shift: ok && !isLastTemplate && currentTokenIndex < end,
        };
    }
    
    if (isTemplateExpressionToken(templateToken)) {
        const end = collectExpression({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        return {
            ok: true,
            end,
            shift: !isLastTemplate && end < lastTokenIndex,
        };
    }
    
    if (isTemplateArrayToken(templateToken)) {
        const [ok, end] = collectArray({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        return {
            ok,
            end,
            shift: ok && currentTokenIndex < end,
        };
    }
    
    return null;
}

function checkIndexes(index, indexCheck) {
    /* c8 ignore start */
    if (indexCheck > index + 1)
        throw Error(`index should never decrease more then on one: ${index} > ${indexCheck}`);
    
    if (index < 0)
        throw Error(`index should never be < zero: ${index}`);
    /* c8 ignore end */
}

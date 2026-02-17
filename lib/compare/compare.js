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
        const state = createMatchState(index);
        
        for (let templateIndex = 0; templateIndex <= lastTemplateIndex; templateIndex++) {
            const templateToken = templateTokens[templateIndex];
            const nextTemplateToken = templateTokens[templateIndex + 1];
            
            const currentTokenIndex = state.index + templateIndex - state.skip;
            
            checkIndexes(state.index, state.index);
            
            if (currentTokenIndex > lastTokenIndex)
                return [NOT_OK];
            
            const handled = handleToken({
                templateToken,
                templateIndex,
                lastTemplateIndex,
                currentTokenIndex,
                tokens,
                nextTemplateToken,
                lastTokenIndex,
                state,
            });
            
            if (!handled.matched) {
                if (handled.skip) {
                    state.skip++;
                    continue;
                }
                
                state.isEqual = false;
                break;
            }
            
            state.isEqual = true;
            state.start = state.index - state.delta;
            state.end = handled.end;
        }
        
        if (state.isEqual)
            return [
                OK,
                state.start,
                state.end + 1,
            ];
    }
    
    return [NOT_OK];
};

const createMatchState = (index) => ({
    index,
    skip: 0,
    delta: 0,
    start: 0,
    end: 0,
    isEqual: false,
});

function handleToken({templateToken, templateIndex, lastTemplateIndex, currentTokenIndex, tokens, nextTemplateToken, lastTokenIndex, state}) {
    const isLast = templateIndex === lastTemplateIndex;
    
    if (isTemplateArgsToken(templateToken)) {
        const [ok, end] = collectArgs({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        if (!ok)
            return {
                matched: false,
                skip: true,
            };
        
        return applyDynamicShift({
            end,
            currentTokenIndex,
            isLast,
            templateIndex,
            state,
        });
    }
    
    if (isTemplateExpressionToken(templateToken)) {
        const end = collectExpression({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        return applyExpressionShift({
            end,
            isLast,
            templateIndex,
            lastTokenIndex,
            currentTokenIndex,
            state,
        });
    }
    
    if (isTemplateArrayToken(templateToken)) {
        const [ok, end] = collectArray({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        
        if (!ok)
            return {
                matched: false,
                skip: true,
            };
        
        return applyDynamicShift({
            end,
            currentTokenIndex,
            isLast,
            templateIndex,
            state,
        });
    }
    
    if (!equalTemplate(tokens[currentTokenIndex], templateToken))
        return {
            matched: false,
        };
    
    return {
        matched: true,
        end: currentTokenIndex,
    };
}

function applyDynamicShift({end, currentTokenIndex, isLast, templateIndex, state}) {
    if (isLast)
        return {
            matched: true,
            end,
        };
    
    if (currentTokenIndex < end) {
        state.delta = end - currentTokenIndex;
        state.index = end - templateIndex;
    }
    
    return {
        matched: true,
        end: currentTokenIndex,
    };
}

function applyExpressionShift({end, isLast, templateIndex, lastTokenIndex, currentTokenIndex, state}) {
    const outOfBound = end >= lastTokenIndex;
    
    if (outOfBound || isLast)
        return {
            matched: true,
            end,
        };
    
    state.delta = end - currentTokenIndex;
    state.index = end - templateIndex;
    
    return {
        matched: true,
        end: currentTokenIndex,
    };
}

function checkIndexes(index, indexCheck) {
    /* c8 ignore start */
    if (indexCheck > index + 1)
        throw Error(`index should never decrease more then on one: ${index} > ${indexCheck}`);
    
    if (index < 0)
        throw Error(`index should never be < zero: ${index}`);
    /* c8 ignore end */
}

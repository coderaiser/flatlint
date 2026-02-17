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

const isUndefined = (a) => typeof a === 'undefined';

export const compare = (source, template, {index = 0} = {}) => {
    const tokens = prepare(source);
    const templateTokens = prepare(template);
    
    const lastTokenIndex = tokens.length - 1;
    const lastTemplateIndex = templateTokens.length - 1;
    
    for (; index < lastTokenIndex; index++) {
        const state = {
            index,
            delta: 0,
            start: 0,
            end: 0,
            isEqual: false,
        };
        
        for (let t = 0; t <= lastTemplateIndex; t++) {
            const templateToken = templateTokens[t];
            const nextTemplateToken = templateTokens[t + 1];
            const currentTokenIndex = state.index + t - (state.skip || 0);
            
            checkIndexes(state.index, state.index);
            
            if (currentTokenIndex > lastTokenIndex)
                return [NOT_OK];
            
            const handled = handleToken({
                templateToken,
                templateIndex: t,
                lastTemplateIndex,
                currentTokenIndex,
                tokens,
                nextTemplateToken,
                lastTokenIndex,
                state,
            });
            
            if (!handled.matched) {
                if (handled.skip) {
                    state.skip = (state.skip || 0) + 1;
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

function handleToken({templateToken, templateIndex, lastTemplateIndex, currentTokenIndex, tokens, nextTemplateToken, lastTokenIndex, state}) {
    const isLast = templateIndex === lastTemplateIndex;
    
    // Args и Array можно обрабатывать одинаково
    if (isTemplateArgsToken(templateToken) || isTemplateArrayToken(templateToken)) {
        const collector = isTemplateArgsToken(templateToken) ? collectArgs : collectArray;
        const [ok, end] = collector({
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
        
        return applyShift(end, currentTokenIndex, isLast, templateIndex, state);
    }
    
    if (isTemplateExpressionToken(templateToken)) {
        const end = collectExpression({
            currentTokenIndex,
            tokens,
            templateToken,
            nextTemplateToken,
        });
        return applyShift(
            end,
            currentTokenIndex,
            isLast,
            templateIndex,
            state,
            lastTokenIndex,
        );
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

function applyShift(end, currentTokenIndex, isLast, templateIndex, state, lastTokenIndex) {
    const outOfBound = !isUndefined(lastTokenIndex) && end >= lastTokenIndex;
    
    if (isLast || outOfBound)
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

function checkIndexes(index, indexCheck) {
    /* c8 ignore start */
    if (indexCheck > index + 1)
        throw Error(`index should never decrease more then on one: ${index} > ${indexCheck}`);
    
    if (index < 0)
        throw Error(`index should never be < zero: ${index}`);
    /* c8 ignore end */
}


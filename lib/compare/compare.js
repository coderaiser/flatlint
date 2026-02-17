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
    
    for (; index <= lastTokenIndex; index++) {
        const matcher = createMatcher({
            index,
            tokens,
            templateTokens,
            lastTokenIndex,
        });
        
        for (let t = 0; t <= lastTemplateIndex; t++) {
            const templateToken = templateTokens[t];
            const nextTemplateToken = templateTokens[t + 1];
            
            const handled = handleToken(matcher, {
                templateToken,
                templateIndex: t,
                nextTemplateToken,
                lastTemplateIndex,
            });
            
            if (!handled.matched) {
                if (handled.skip) {
                    matcher.skip();
                    continue;
                }
                
                matcher.setUnmatched();
                break;
            }
            
            matcher.setMatched(handled.end);
        }
        
        if (matcher.isMatched())
            return [
                OK,
                matcher.state.start,
                matcher.state.end + 1,
            ];
    }
    
    return [NOT_OK];
};

function createMatcher({index, tokens, templateTokens, lastTokenIndex}) {
    const state = {
        index,
        delta: 0,
        skip: 0,
        start: 0,
        end: 0,
        matched: false,
    };
    
    return {
        tokens,
        templateTokens,
        lastTokenIndex,
        state,
        
        getToken(templateIndex) {
            return this.tokens[state.index + templateIndex - state.skip];
        },
        
        skip() {
            state.skip++;
        },
        
        setMatched(end) {
            state.matched = true;
            state.start = state.index - state.delta;
            state.end = end;
        },
        
        setUnmatched() {
            state.matched = false;
        },
        
        isMatched() {
            return state.matched;
        },
        
        updateDelta(currentTokenIndex, end, templateIndex) {
            if (currentTokenIndex < end) {
                state.delta = end - currentTokenIndex;
                state.index = end - templateIndex;
            }
        },
    };
}

function handleToken(matcher, {templateToken, templateIndex, nextTemplateToken, lastTemplateIndex}) {
    const isLast = templateIndex === lastTemplateIndex;
    const currentTokenIndex = matcher.state.index + templateIndex - (matcher.state.skip || 0);
    
    if (currentTokenIndex > matcher.lastTokenIndex)
        return {
            matched: false,
        };
    
    const currentToken = matcher.getToken(templateIndex);
    
    if (isTemplateArgsToken(templateToken) || isTemplateArrayToken(templateToken)) {
        const collector = isTemplateArgsToken(templateToken) ? collectArgs : collectArray;
        const [ok, end] = collector({
            currentTokenIndex,
            tokens: matcher.tokens,
            templateToken,
            nextTemplateToken,
        });
        
        if (!ok)
            return {
                matched: false,
                skip: true,
            };
        
        matcher.updateDelta(currentTokenIndex, end, templateIndex);
        return {
            matched: true,
            end: isLast ? end : currentTokenIndex,
        };
    }
    
    if (isTemplateExpressionToken(templateToken)) {
        const end = collectExpression({
            currentTokenIndex,
            tokens: matcher.tokens,
            templateToken,
            nextTemplateToken,
        });
        
        matcher.updateDelta(currentTokenIndex, end, templateIndex);
        
        return {
            matched: true,
            end: isLast ? end : currentTokenIndex,
        };
    }
    
    if (!currentToken || !equalTemplate(currentToken, templateToken))
        return {
            matched: false,
        };
    
    return {
        matched: true,
        end: currentTokenIndex,
    };
}

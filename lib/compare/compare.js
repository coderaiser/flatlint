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
            
            const {
                matched,
                skip,
                end,
            } = matchToken(
                matcher,
                {
                    templateToken,
                    templateIndex: t,
                    nextTemplateToken,
                    lastTemplateIndex,
                },
            );
            
            if (!matched) {
                if (skip) {
                    matcher.skip();
                    continue;
                }
                
                matcher.setUnmatched();
                break;
            }
            
            matcher.setMatched(end);
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

function collectArgsNormalized(ctx) {
    const [ok, end] = collectArgs(ctx);
    return {ok, end};
}

function collectArrayNormalized(ctx) {
    const [ok, end] = collectArray(ctx);
    return {ok, end};
}

function collectExpressionNormalized(ctx) {
    const end = collectExpression(ctx);
    return {ok: true, end};
}

const matchers = [{
    test: isTemplateArgsToken,
    collect: collectArgsNormalized,
}, {
    test: isTemplateArrayToken,
    collect: collectArrayNormalized,
}, {
    test: isTemplateExpressionToken,
    collect: collectExpressionNormalized,
}];

function matchToken(matcher, {templateToken, templateIndex, nextTemplateToken, lastTemplateIndex}) {
    const isLast = templateIndex === lastTemplateIndex;
    
    const currentTokenIndex = matcher.state.index + templateIndex - matcher.state.skip;
    
    if (currentTokenIndex > matcher.lastTokenIndex)
        return {matched: false};
    
    const currentToken = matcher.getToken(templateIndex);
    
    // --- dynamic ---
    for (const {test, collect} of matchers) {
        if (!test(templateToken))
            continue;
        
        const {ok, end} = collect({
            currentTokenIndex, tokens: matcher.tokens,
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
    
    // --- static ---
    if (!currentToken || !equalTemplate(currentToken, templateToken))
        return {matched: false};
    
    return {
        matched: true,
        end: currentTokenIndex,
    };
}

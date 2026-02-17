import {prepare} from '#parser';
import {OK, NOT_OK} from '#types';
import {matchToken} from './match-token.js';

export const compare = (source, template, {index = 0} = {}) => {
    const tokens = prepare(source);
    const templateTokens = prepare(template);
    
    const lastTokenIndex = tokens.length - 1;
    const lastTemplateIndex = templateTokens.length - 1;
    
    for (; index <= lastTokenIndex; index++) {
        const cursor = createCursor({
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
            } = matchToken(cursor, {
                templateToken,
                templateIndex: t,
                nextTemplateToken,
                lastTemplateIndex,
            });
            
            if (!matched) {
                if (skip) {
                    cursor.skip();
                    continue;
                }
                
                cursor.setUnmatched();
                break;
            }
            
            cursor.setMatched(end);
        }
        
        if (cursor.isMatched())
            return [
                OK,
                cursor.state.start,
                cursor.state.end + 1,
            ];
    }
    
    return [NOT_OK];
};

function createCursor({index, tokens, templateTokens, lastTokenIndex}) {
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

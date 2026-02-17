import {equalTemplate} from './equal.js';
import {matchers} from './matchers/index.js';

const SKIP = {
    skip: true,
    matched: false,
};

const NOT_MATCHED = {
    matched: false,
};

const createMatched = (a) => ({
    ...a,
    matched: true,
});

export function matchToken(cursor, {templateToken, templateIndex, nextTemplateToken, lastTemplateIndex}) {
    const isLast = templateIndex === lastTemplateIndex;
    
    const currentTokenIndex = cursor.state.index + templateIndex - cursor.state.skip;
    
    if (currentTokenIndex > cursor.lastTokenIndex)
        return NOT_MATCHED;
    
    const currentToken = cursor.getToken(templateIndex);
    
    for (const {testToken, collect} of matchers) {
        if (!testToken(templateToken))
            continue;
        
        const [ok, end] = collect({
            currentTokenIndex,
            tokens: cursor.tokens,
            templateToken,
            nextTemplateToken,
        });
        
        if (!ok)
            return SKIP;
        
        cursor.updateDelta(currentTokenIndex, end, templateIndex);
        
        return createMatched({
            end: isLast ? end : currentTokenIndex,
        });
    }
    
    if (!currentToken || !equalTemplate(currentToken, templateToken))
        return NOT_MATCHED;
    
    return createMatched({
        end: currentTokenIndex,
    });
}

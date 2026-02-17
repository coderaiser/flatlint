import {equalTemplate} from './equal.js';
import {matchers} from './matchers/index.js';

export function matchToken(cursor, {templateToken, templateIndex, nextTemplateToken, lastTemplateIndex}) {
    const isLast = templateIndex === lastTemplateIndex;
    
    const currentTokenIndex = cursor.state.index + templateIndex - cursor.state.skip;
    
    if (currentTokenIndex > cursor.lastTokenIndex)
        return {
            matched: false,
        };
    
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
            return {
                matched: false,
                skip: true,
            };
        
        cursor.updateDelta(currentTokenIndex, end, templateIndex);
        
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

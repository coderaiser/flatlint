import {prepare} from '#parser';
import {OK, NOT_OK} from '#types';
import {matchToken} from './match-token.js';
import {createCursor} from './cursor.js';

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


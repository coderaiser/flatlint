import {prepare} from '#parser';
import {OK, NOT_OK} from '#types';
import {match} from './match.js';
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
        
        for (let templateIndex = 0; templateIndex <= lastTemplateIndex; templateIndex++) {
            const templateToken = templateTokens[templateIndex];
            const nextTemplateToken = templateTokens[templateIndex + 1];
            const isLast = templateIndex === lastTemplateIndex;
            
            const {
                matched,
                skip,
                end,
            } = match(cursor, {
                templateToken,
                nextTemplateToken,
                templateIndex,
                isLast,
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


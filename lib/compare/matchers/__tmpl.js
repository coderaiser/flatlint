import {
    isTemplateTail,
    isTemplateTmpl,
    OK,
} from '#types';

export const test = isTemplateTmpl;

export const collect = ({currentTokenIndex, tokens}) => {
    let index = currentTokenIndex;
    
    const n = tokens.length;
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (isTemplateTail(token))
            break;
    }
    
    return [
        OK,
        index,
    ];
};

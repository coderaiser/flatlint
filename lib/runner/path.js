import {
    isIdentifier,
    isNewLine,
    isPunctuator,
    isWhiteSpace,
} from '#types';

export const createPath = ({tokens, start, end}) => ({
    tokens,
    start,
    end,
    isNextIdentifier: createIsNextIdentifier({
        tokens,
        end,
    }),
    getAllPrev: createGetAllPrev({
        tokens,
        start,
    }),
    getAllNext: createGetAllNext({
        tokens,
        end,
    }),
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
    isPrevIdentifier: createIsPrevIdentifier({
        tokens,
        start,
    }),
    isCurrentPunctuator: createIsNextPunctuator({
        tokens,
        end: end - 1,
    }),
});

const createIsNextIdentifier = ({tokens, end}) => (value) => {
    const current = tokens[end];
    
    if (!current)
        return false;
    
    return isIdentifier(current, value);
};

const createIsNextPunctuator = ({tokens, end}) => (punctuator) => {
    let current = tokens[end];
    
    if (!current)
        return false;
    
    if (isWhiteSpace(current))
        current = tokens[end + 1];
    
    return isPunctuator(current, punctuator);
};

const createIsPrevIdentifier = ({tokens, start}) => (value) => {
    const SPACE = 1;
    const FUNCTION = 1;
    const current = tokens[start - (FUNCTION + SPACE)];
    
    if (!current)
        return false;
    
    return isIdentifier(current, value);
};

const createGetAllPrev = ({tokens, start}) => function*() {
    for (let i = start; i >= 0; --i) {
        yield tokens[i];
    }
};

const createGetAllNext = ({tokens, end}) => function*() {
    for (let i = end; i < tokens.length; ++i) {
        const current = tokens[i];
        
        if (isNewLine(current))
            continue;
        
        yield current;
    }
};

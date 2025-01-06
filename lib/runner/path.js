import {isNewLine, isPunctuator} from '#types';

export const createPath = ({tokens, start, end}) => ({
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
    isEndsWithPunctuator: createIsEndsWithPunctuator({
        tokens,
        end,
    }),
});

const createIsNextPunctuator = ({tokens, end}) => (punctuator) => {
    const current = tokens[end];
    
    if (!current)
        return false;
    
    return isPunctuator(current, punctuator);
};

const createIsEndsWithPunctuator = ({tokens, end}) => (punctuator) => {
    const current = tokens[end - 1];
    return isPunctuator(current, punctuator);
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

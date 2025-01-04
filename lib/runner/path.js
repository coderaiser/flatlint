import {isNewLine} from '#types';

export const createPath = ({tokens, start}) => ({
    getPrev: createGetPrev({
        tokens,
        start,
    }),
    getNext: createGetNext({
        tokens,
        start,
    }),
});

function createGetPrev({tokens, start}) {
    return function*() {
        for (let i = start; i >= 0; --i) {
            yield tokens[i];
        }
    };
}

function createGetNext({tokens, start}) {
    return function*() {
        for (let i = start; i < tokens.length; ++i) {
            const current = tokens[i];
            
            if (isNewLine(current))
                continue;
            
            yield current;
        }
    };
}

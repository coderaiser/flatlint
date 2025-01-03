export const createPath = ({tokens, start}) => ({
    getPrev: createGetPrev({
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

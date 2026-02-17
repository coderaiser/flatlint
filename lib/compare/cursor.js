export function createCursor({index, tokens, templateTokens, lastTokenIndex}) {
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
        
        getIndex(templateIndex) {
            return this.state.index + templateIndex - this.state.skip;
        },
        
        getToken(templateIndex) {
            const index = this.getIndex(templateIndex);
            return this.tokens[index];
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

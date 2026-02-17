import {isIdentifier} from '#types';
import * as argsMatcher from './args.js';
import * as arrayMatcher from './array.js';
import * as expressionMatcher from './expression.js';

export const matchers = [
    argsMatcher,
    arrayMatcher,
    expressionMatcher,
].map(createMatcher);

function createMatcher({test, collect, testToken}) {
    return {
        collect,
        test,
        testToken: testToken || ((token) => {
            const {value} = token;
            
            if (!isIdentifier(token))
                return false;
            
            return test(value);
        }),
    };
}

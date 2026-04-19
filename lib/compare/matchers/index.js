import {isIdentifier} from '#types';
import * as argsMatcher from './__args.js';
import * as arrayMatcher from './__array.js';
import * as expressionMatcher from './__expr.js';
import * as tmplMatcher from './__tmpl.js';

export const matchers = [
    argsMatcher,
    arrayMatcher,
    expressionMatcher,
    tmplMatcher,
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

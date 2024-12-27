import {createTest as createPutoutTest} from '@putout/test';
import {lint} from '#tklint';

const tupleToObject = (fn) => (...a) => {
    const [code, places] = fn(...a);
    
    return {
        code,
        places,
    };
};

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        lint: tupleToObject(lint),
        ...options,
    });
};

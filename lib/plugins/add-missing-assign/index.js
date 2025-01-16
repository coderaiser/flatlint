import {isOneOfKeywords} from '#types';

export const report = () => 'Add missing assign';

export const match = () => ({
    '__x __a __b': ({__x}) => {
        return isOneOfKeywords(__x, ['const', 'let', 'var']);
    },
});

export const replace = () => ({
    '__x __a __b': '__x __a = __b',
});

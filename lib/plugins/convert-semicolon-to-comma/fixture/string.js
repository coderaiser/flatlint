export const replace = ({
    'const __a = require(__b).default': 'import __a from "__b"';
    'const __a = require(__b).__c': ({__c}, path) => {
        return '';
    }
});
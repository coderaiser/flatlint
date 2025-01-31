import debug from 'debug';
import {compare} from '#compare';
import {prepare} from '#parser';
import {
    findVarsWays,
    getCurrentValues,
    setValues,
} from '#compare/values';
import {createPath} from './path.js';

const returns = (a) => () => a;
const {entries} = Object;
const logCompare = debug('flatlint:compare');
const logFix = debug('flatlint:fix');

export const replace = (tokens, {fix, rule, plugin}) => {
    const places = [];
    let isFixed = false;
    
    const match = plugin.match?.() ?? returns({});
    
    for (const [from, to] of entries(plugin.replace())) {
        let index = 0;
        
        while (index < tokens.length - 1) {
            logCompare(`${rule}: ${from} -> ${to}`);
            const [ok, start, end] = compare(tokens, from, {
                index,
            });
            
            if (!ok)
                break;
            
            const values = getCurrentValues({
                from,
                start,
                end,
                tokens,
            });
            
            const matchFn = match[from];
            
            if (matchFn) {
                const is = matchFn(values, createPath({
                    tokens,
                    start,
                    end,
                }));
                
                if (!is) {
                    index = end;
                    continue;
                }
            }
            
            if (fix) {
                logFix(`${rule}: ${from} -> ${to}`);
                
                const preparedTo = prepare(to);
                const waysTo = findVarsWays(preparedTo);
                
                setValues({
                    values,
                    waysTo,
                    to: preparedTo,
                });
                
                tokens.splice(start, end - start, ...preparedTo);
                isFixed = true;
                index = end;
                
                continue;
            }
            
            const {line, column} = tokens[end - 1];
            const message = plugin.report();
            
            places.push({
                rule,
                message,
                position: {
                    line,
                    column,
                },
            });
            
            index = end;
            isFixed = false;
        }
    }
    
    return [isFixed, places];
};

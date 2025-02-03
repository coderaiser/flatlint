import {loadPlugins} from '@putout/engine-loader';
import {parse} from '#parser';
import {run} from '#runner';
import {print} from '#printer';

export function lint(source, overrides = {}) {
    const {
        startLine = 0,
        fix = true,
        plugins: pluginNames = [],
    } = overrides;
    
    const plugins = loadPlugins({
        pluginNames,
    });
    
    const tokens = parse(source);
    
    const rawPlaces = run(tokens, {
        plugins,
        fix,
    });
    
    const places = rawPlaces.map(addStartLine(startLine));
    
    if (!fix)
        return [source, places];
    
    return [
        print(tokens),
        places,
    ];
}

const addStartLine = (startLine) => (a) => {
    const {line, column} = a.position;
    
    return {
        ...a,
        position: {
            column,
            line: startLine + line,
        },
    };
};

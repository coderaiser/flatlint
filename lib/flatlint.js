import {loadPlugins} from '@putout/engine-loader';
import {run} from './runner/runner.js';
import {parse} from './parser/index.js';

export function lint(source, overrides = {}) {
    const {fix = true, plugins: pluginNames = []} = overrides;
    const plugins = loadPlugins({
        pluginNames,
    });
    
    const tokens = parse(source);
    
    const [places] = run(tokens, {
        plugins,
        fix,
    });
    
    if (!fix)
        return [source, places];
    
    return [
        print(tokens),
        places,
    ];
}

function print(tokens) {
    return tokens
        .map((token) => token.value)
        .join('');
}

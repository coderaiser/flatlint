# TKLint

Token-based JavaScript linter that fixes Syntax Errors

## Install

```
npm i tklint
```

## API

```js
import {lint, plugins} from 'tklint/with-plugins';

const {code} = tklint(`a && b = c`, {
    plugins,
});

// returns
`
a && (b = c);
`;
```

Without `fix`:

```js
import {lint, plugins} from 'tklint/with-plugins';

const {places} = tklint(`a && b = c`, {
    fix: false,
    plugins,
});

// returns
[{
    column: 1,
    line: 1,
    message: `Wrap the assignment in parentheses after '&&'`,
    rule: 'wrap-assignment-in-parens',
}];
```

When you want to use custom plugins:

```js
import {lint} from 'tklint';

lint(`a && b = c`, {
    plugins: [
        ['wrap-assignment-in-parens', {
            report: () => `Wrap the assignment in parentheses after '&&'`,
            replace: () => ({
                '__a && __b = __c': '__a && (__b = __c)',
            }),
        }],
    ],
});
```

## License

MIT

# FlatLint

Token-based JavaScript linter that fixes Syntax Errors

## Install

```
npm i flatlint
```

## Available fixes

<details><summary>Assignment without parentheses after <code>&&</code></summary>

```diff
-a && b = c;
+a && (b = c);
```

</details>

<details><summary>Convert <code>,</code> to <code>;</code> at the end of statement</summary>

```diff
-const a = 5,
+const a = 5;
```

</details>

<details><summary>forgotten round braces in if statement</summary>

```diff
-if a > 5 {
+if (a > 5) {
    alert();
}
```

 </details>

<details><summary>remove useless round brace</summary>

```diff
-const a = 5);
+const a = 5;
```

 </details>

## API

```js
import {lint, plugins} from 'flatlint/with-plugins';

const [code] = flatlint(`a && b = c`, {
    plugins,
});

// returns
`
a && (b = c);
`;
```

Without `fix`:

```js
import {lint, plugins} from 'flatlint/with-plugins';

const [, places] = flatlint(`a && b = c`, {
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
import {lint} from 'flatlint';

const [code] = lint(`a && b = c`, {
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

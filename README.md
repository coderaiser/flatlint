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

<details><summary>Convert <code>from</code> to <code>require</code></summary>

```diff
-const a = from 'a';
+const a = require('a');
```

</details>

<details><summary>add missing round brace</summary>

```diff
-if a > 5 {
+if (a > 5) {
    alert();
}

-a('hello'
+a('hello');

const m = {
-    z: z('hello'
+    z: z('hello')
}
```

 </details>

<details><summary>add <code>const</code> to <code>export</code></summary>

```diff
-export x = 5;
+export const x = 5;
```

 </details>

<details><summary>add missing squire brace</summary>

```diff
-const a = ['hello', 'world';
+const a = ['hello', 'world'];
```

 </details>

<details><summary>remove useless round brace</summary>

```diff
-const a = 5);
+const a = 5;

-import a from 'a');
+import a from 'a';
```

 </details>

<details><summary>remove useless square brace</summary>

```diff
-const a = [1, 2, 3]];
+const a = [1, 2, 3];
```

 </details>

<details><summary>remove useless semicolon</summary>

```diff
const a = {
-    b: 'hello';
+    b: 'hello',
}
```

 </details>

<details><summary>add missing quote</summary>

```diff
-const a = 'hello
+const a = 'hello'

-fn('hello);
+fn('hello');
```

 </details>

<details><summary>Remove useless arrow</summary>

```diff
-function parse(source) => {
+function parse(source) {
    return source;
}
```

 </details>

<details><summary>Remove useless coma</summary>

```diff
const a = class {
-    b() {},
+    b() {}
}
```

 </details>

<details><summary>add missing semicolon</summary>

```diff
-const a = 5
+const a = 5;
```

 </details>

## Template literals

**FlatLint** uses language similar to 🐊[**PutoutScript**](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript).

It can look similar, but has a couple differences:

- ✅ it may not be valid **JavaScript**, it can be couple tokens that can be fixed;
- ✅ it counts each symbol as a token;

### `__a`

From `__a` to `__z` is usually identifiers, but can also be strings if used with quotes `'__a'` they can be single or double,
it can be only one quote `'__a` - this is valid, since **FlatLint** is tokens based.

### `__array`

Collects everything that looks like array elements, it can start from squire brace `[__array;`, but that's not important
to end with it, since it used to fix error patterns.

### `__args`

Collects arguments of function when exists.

### `__expr`

Collects everything that looks like expression.

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

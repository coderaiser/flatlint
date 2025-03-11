# FlatLint[![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/flatlint "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/flatlint.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/flatlint/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/flatlint/workflows/Node%20CI/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/coderaiser/flatlint?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/flatlint/badge.svg?branch=master&service=github

Token-based JavaScript linter that fixes Syntax Errors

## Install

```
npm i flatlint
```

## Available fixes

<details><summary>apply import order</summary>

```diff
-import {readFile}, fs from 'node:fs';
+import fs, {readFile} from 'node:fs';
```

</details>

<details><summary>assignment without parentheses after <code>&&</code></summary>

```diff
-a && b = c;
+a && (b = c);
```

</details>

<details><summary>convert comma to semicolon</summary>

```diff
-const a = 5,
+const a = 5;

function x() {
-   return m,
+   return m;
}

-import a from 'a',
+import a from 'a';

-const a = 3,
+const a = 3;
module.exports = 2;
```

</details>

<details><summary>convert colon to semicolon</summary>

```diff
-console.log(a, b):
+console.log(a, b);
```

</details>

<details><summary>convert <code>from</code> to <code>require</code></summary>

```diff
-const a = from 'a';
+const a = require('a');
```

</details>

<details><summary>add missing curly brace</summary>

```diff
-function a({b, c) {}
-function a({b, c}) {}

-const {a = b;
+const {a} = b;
```

</details>

<details><summary>add missing round brace</summary>

```diff
-if a > 5 {
+if (a > 5) {
    alert();
}

-if (a.b() {
+if (a.b()) {
}

-a('hello'
+a('hello');

const m = {
-    z: z('hello'
+    z: z('hello')
}

-{hello} = world;
+({hello} = world);

-assign(oldPath, currentPath;
+assign(oldPath, currentPath);
```

</details>

<details><summary>add missing assign</summary>

```diff
-const a 5;
+const a = 5;

-module.exports {};
+module.exports = {};
```

</details>

<details><summary>add missing comma</summary>

```diff
import {
-   a
+   a,
    b,
} from 'c';

t.transform('declare-imports-first', {
-   'declare-imports-first': declareImportsFirst
+   'declare-imports-first': declareImportsFirst,
    'convert-esm-to-commonjs': convertEsmToCommonJs,
});
```

 </details>

<details><summary>add missing arrow <code>'=>'</code></summary>

```diff
-const a = (b, c) {};
+const a = (b, c) => {};
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

if (a) {
-})
+}
```

 </details>

<details><summary>remove useless square brace</summary>

```diff
-const a = [1, 2, 3]];
+const a = [1, 2, 3];
```

 </details>

<details><summary>convert semicolon to comma</summary>

```diff
const a = {
-    b: 'hello';
+    b: 'hello',
}

const b = [
    1,
-   2;
+   2,
    3,
]
```

 </details>

<details><summary>remove useless comma</summary>

```diff
function x() {
    return m;
-},
+}

-const expected = [],
+const expected = [];
t.equal(expected, []);
```

 </details>

<details><summary>remove useless dot</summary>

```diff
-fn([].);
+fn([].);
```

 </details>

<details><summary>remove invalid character</summary>

```diff
-const {¬
-····is,¬
-····sArgsStr,¬
-····isTypeParamsStr,¬
-} = require('./is');¬
+const {
+    is,
+    isArgsStr,
+    isTypeParamsStr,
+} = require('./is');
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
    startLine: 1,
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

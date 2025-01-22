return [isFixed, places];

const cssNames = [
    'nojs',
    'view',
    'config',
    'terminal',
    'user-menu',
    ...getCSSList('columns'),
    ...getCSSList('themes')
];

const plugins = [
    new EnvironmentPlugin({
        NODE_ENV,
    }),
    new ServiceWorkerWebpackPlugin({
        entry: join(__dirname, '..', 'client', 'sw', 'sw.js'),
        excludes: ['*'],
    }),
    new WebpackBar(),
];
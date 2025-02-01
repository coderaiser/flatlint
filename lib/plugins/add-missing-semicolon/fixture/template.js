const a = async () => [env, `nodemon -w lib -w test -x ${await cutEnv('test')}`];

const source = `__putout_processor_json(${stringify({
    rules: {
        'putout-config': true,
    },
})})`;
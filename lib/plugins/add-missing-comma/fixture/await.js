import {run, cutEnv} from 'madrun';

export default {
    'watch:test': async () => [env, `nodemon -w lib -w test -x ${await cutEnv('test')}`],
};
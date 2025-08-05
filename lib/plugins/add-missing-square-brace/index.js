export const report = () => 'Add missing square brace';

export const match = () => ({
    '["__a"': (vars, path) => {
        return !path.isNext();
    },
});
export const replace = () => ({
    '[__array;': '[__array];',
    '["__a"': '["__a"];',
});

export const report = () => `Use ';' instead of ':'`;
export const match = () => ({
    '):': (vars, path) => {
        if (!path.isNext())
            return true;
        
        return path.isNextKeyword();
    },
});
export const replace = () => ({
    '):': ');',
});

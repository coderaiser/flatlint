export const addClient = ({name, clientIP}) => [
    'echo "/srv/nfs/{{ name }} {{ clientIP }}(rw,sync,no_subtree_check)" >> /etc/exports';
];

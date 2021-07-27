import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (ms: number) => format(ms, 'dd-MM-yyyy');

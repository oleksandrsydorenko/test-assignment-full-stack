import { format } from 'date-fns';

import { DATE_TIME_FORMAT } from '../constants';
import { ISelectItem } from '../ts';

export const formatDate = (ms: number) => format(ms, DATE_TIME_FORMAT);

export const prepareSelectItems = <T>(map: T): ISelectItem[] =>
  Object.entries(map).map(item => ({
    name: item[1],
    value: item[0],
  }));

export const prepareSelectValue = <T, K>(map: T, value: K): keyof T => {
  const result = Object.entries(map).find(item => item[1] === value);

  return (result && result[0]) as keyof T;
};

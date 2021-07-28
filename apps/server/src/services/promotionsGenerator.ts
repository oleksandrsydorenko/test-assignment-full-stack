import {
  adjectives,
  colors,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator';

import {
  IGeneratePromotions,
  IPromotion,
  IPromotionType,
  IPromotionUserGroupName,
  PromotionTypes,
  PromotionUserGroupNames,
} from '../ts';
import { PROMOTION_TYPE, PROMOTION_USER_GROUP_NAME } from '../constants';

const MAX_DATE_RANGE_IN_MS = 2592000000; // 30 days in milliseconds

const randomizeNumber = (range: number): number =>
  Math.floor(Math.random() * range);

const randomizeDate = (date: number): number =>
  Date.now() + randomizeNumber(date);

const randomizeMapValue = <T, K>(map: T): K => {
  const values: K[] = Object.values(map);

  return values[randomizeNumber(values.length)];
};

const generate: IGeneratePromotions = (itemsNumber, startNumber) => {
  const promotions: IPromotion[] = [];

  for (let i = 0; i < itemsNumber; i++) {
    const startDate = randomizeDate(MAX_DATE_RANGE_IN_MS);

    promotions.push({
      startDate,
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, colors, names],
        separator: ' ',
        length: 3,
      }),
      endDate: startDate + randomizeNumber(MAX_DATE_RANGE_IN_MS),
      serialNumber: startNumber + i,
      type: randomizeMapValue<IPromotionType, PromotionTypes>(PROMOTION_TYPE),
      userGroupName: randomizeMapValue<
        IPromotionUserGroupName,
        PromotionUserGroupNames
      >(PROMOTION_USER_GROUP_NAME),
    });
  }

  return promotions;
};

export default generate;

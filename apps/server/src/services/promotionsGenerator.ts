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
  PromotionTypeKeys,
  PromotionUserGroupNameKeys,
} from '../ts';
import { PROMOTION_TYPE, PROMOTION_USER_GROUP_NAME } from '../constants';

const MAX_DATE_RANGE_IN_MS = 2592000000; // 30 days in milliseconds

const randomizeNumber = (range: number): number =>
  Math.floor(Math.random() * range);

const randomizeDate = (date: number): number =>
  Date.now() + randomizeNumber(date);

const randomizeMapValue = <T>(map: T): string => {
  const keys: string[] = Object.values(map);

  return keys[randomizeNumber(keys.length)];
};

const generate: IGeneratePromotions = count => {
  const promotions: IPromotion[] = [];

  for (let i = 0; i < count; i++) {
    const startDate = randomizeDate(MAX_DATE_RANGE_IN_MS);

    promotions.push({
      startDate,
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, colors, names],
        separator: ' ',
        length: 3,
      }),
      endDate: startDate + randomizeNumber(MAX_DATE_RANGE_IN_MS),
      type: randomizeMapValue<IPromotionType>(
        PROMOTION_TYPE
      ) as PromotionTypeKeys,
      userGroupName: randomizeMapValue<IPromotionUserGroupName>(
        PROMOTION_USER_GROUP_NAME
      ) as PromotionUserGroupNameKeys,
    });
  }

  return promotions;
};

export default generate;

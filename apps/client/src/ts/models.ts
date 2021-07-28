export type PromotionTypes = 'Basic' | 'Common' | 'Epic';

export type PromotionUserGroupNames = 'Standard' | 'VIP';

export interface IPromotion {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  serialNumber: number;
  type: PromotionTypes;
  userGroupName: PromotionUserGroupNames;
}

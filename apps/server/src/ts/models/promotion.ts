import { Document, Model } from 'mongoose';

export type PromotionTypes = 'Basic' | 'Common' | 'Epic';

export type PromotionUserGroupNames = 'Standard' | 'VIP';
export interface IPromotion {
  name: string;
  startDate: number;
  endDate: number;
  serialNumber: number;
  type: PromotionTypes;
  userGroupName: PromotionUserGroupNames;
}

export interface IPromotionResponse extends IPromotion {
  id: string;
}

export interface IPromotionDocument extends IPromotion, Document {}

export interface IPromotionModel extends Model<IPromotionDocument> {}

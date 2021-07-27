import { Document, Model } from 'mongoose';
import { IPromotionType, IPromotionUserGroupName } from '../constants';

export type PromotionTypeKeys = keyof IPromotionType;

export type PromotionUserGroupNameKeys = keyof IPromotionUserGroupName;

export interface IPromotion {
  name: string;
  startDate: number;
  endDate: number;
  type: PromotionTypeKeys;
  userGroupName: PromotionUserGroupNameKeys;
}

export interface IPromotionDocument extends IPromotion, Document {}

export interface IPromotionModel extends Model<IPromotionDocument> {}

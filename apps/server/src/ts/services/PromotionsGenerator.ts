import { IPromotion } from '../models';

export interface IGeneratePromotions {
  (count: number): IPromotion[];
}

import { IPromotion } from '../models';

export interface IGeneratePromotions {
  (itemsNumber: number, startNumber: number): IPromotion[];
}

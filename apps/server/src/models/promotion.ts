import { model, Schema } from 'mongoose';

import { IPromotionDocument, IPromotionModel } from '../ts';

const PromotionSchema: Schema = new Schema({
  name: String,
  startDate: Number,
  endDate: Number,
  serialNumber: Number,
  type: String,
  userGroupName: String,
});

const PromotionModel: IPromotionModel = model<
  IPromotionDocument,
  IPromotionModel
>('Promotion', PromotionSchema);

export default PromotionModel;

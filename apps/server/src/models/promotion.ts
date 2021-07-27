import { model, Schema } from 'mongoose';
import { IPromotionDocument, IPromotionModel } from '../ts';

const PromotionSchema: Schema = new Schema(
  {
    name: String,
    type: String,
    startDate: Number,
    endDate: Number,
    userGroupName: String,
  },
  {
    timestamps: true,
  }
);

const PromotionModel: IPromotionModel = model<
  IPromotionDocument,
  IPromotionModel
>('Promotion', PromotionSchema);

export default PromotionModel;

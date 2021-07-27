export interface IApiRoute {
  PROMOTION: string;
  PROMOTIONS: string;
}

export interface IParamsDefault {
  PROMOTIONS_COUNT: number;
  PROMOTIONS_LIMIT: number;
}

export interface IPromotionType {
  BASIC: 'Basic';
  COMMON: 'Common';
  EPIC: 'Epic';
}

export interface IPromotionUserGroupName {
  STANDARD: 'Standard';
  VIP: 'VIP';
}

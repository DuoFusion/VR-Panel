import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface CouponCodeFormValues {
  name?: string;
  code?: string;
  description?: string;
  discount?: number;
  discountType?: string;
  startDate?: string;
  endDate?: string;
  numberOfUses?: number;
  usedCount?: number;
}

export interface CouponCodeType extends CouponCodeFormValues, CommonDataType {
  _id: string;
}

export interface CouponCodeDataResponse extends PageStatus {
  coupon_data: CouponCodeType[];
}

export interface CouponCodeApiResponse extends MessageStatus {
  data: CouponCodeDataResponse;
}

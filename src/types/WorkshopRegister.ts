import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { CouponCodeType } from "./CouponCode";
import { WorkshopType } from "./Workshop";

export interface WorkshopRegisterFormValues {
  workshopId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  profession?: string;
  paymentStatus?: string;
  fees?: number;
  couponCodeId?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export interface WorkshopRegisterType extends Omit<Required<WorkshopRegisterFormValues>, "workshopId" | "couponCodeId">, CommonDataType {
  _id: string;
  workshopId: WorkshopType;
  couponCodeId: CouponCodeType;
}

export interface WorkshopRegisterDataResponse extends PageStatus {
  workshopRegister_data: WorkshopRegisterType[];
}

export interface WorkshopRegisterApiResponse extends MessageStatus {
  data: WorkshopRegisterDataResponse;
}

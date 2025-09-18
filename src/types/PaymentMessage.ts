import { CommonDataType, MessageStatus } from "./Common";

export interface PaymentSuccessType extends CommonDataType {
  message: string;
}

export interface PaymentSuccessApiResponse extends MessageStatus {
  data: PaymentSuccessType;
}

export interface PaymentFailedType extends CommonDataType {
  message: string;
}

export interface PaymentFailedApiResponse extends MessageStatus {
  data: PaymentFailedType;
}
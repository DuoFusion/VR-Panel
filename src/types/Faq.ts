import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface FaqFormValues {
  question?: string;
  answer?: string;
  priority?: number;
}

export interface FaqType extends FaqFormValues, CommonDataType {
  _id: string;
}

export interface FaqDataResponse extends PageStatus {
  faq_data: FaqType[];
}

export interface FaqApiResponse extends MessageStatus {
  data: FaqDataResponse;
}

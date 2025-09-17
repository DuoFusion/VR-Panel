import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface ContactUsType extends CommonDataType {
  _id: string;
  name?: string;
  email?: string;
  message?: string;
  archive?: boolean;
}

export interface ContactUsDataResponse extends PageStatus {
  contactUs_data: ContactUsType[];
}

export interface ContactUsApiResponse extends MessageStatus {
  data: ContactUsDataResponse;
}

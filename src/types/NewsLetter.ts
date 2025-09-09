import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface NewsLetterType extends CommonDataType {
  _id: string;
  email?: string;
}

export interface NewsLetterDataResponse extends PageStatus {
  newsLetter_data: NewsLetterType[];
}

export interface NewsLetterApiResponse extends MessageStatus {
  data: NewsLetterDataResponse;
}

import { CommonDataType, MessageStatus } from "./Common";

export interface AboutType extends CommonDataType {
  _id: string;
  aboutUs: string;
}

export interface AboutApiResponse extends MessageStatus {
  data: AboutType;
}

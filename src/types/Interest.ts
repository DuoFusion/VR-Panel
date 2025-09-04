import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface InterestFormValues {
  name?: string;
  priority?: number;
}

export interface InterestType extends InterestFormValues, CommonDataType {
  _id: string;
}

export interface InterestDataResponse extends PageStatus {
  interest_data: InterestType[];
}

export interface InterestApiResponse extends MessageStatus {
  data: InterestDataResponse;
}

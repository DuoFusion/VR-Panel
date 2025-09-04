import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface LanguagesFormValues {
  name?: string;
  priority?: number;
}

export interface LanguagesType extends LanguagesFormValues, CommonDataType {
  _id: string;
}

export interface LanguagesDataResponse extends PageStatus {
  language_data: LanguagesType[];
}

export interface LanguagesApiResponse extends MessageStatus {
  data: LanguagesDataResponse;
}

import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface TestomonialsFormValues {
  name?: string;
  role?: string;
  message?: string;
  rating?: number;
  image?: string | string[];
  priority?: number;
}

export interface TestomonialsType extends TestomonialsFormValues, CommonDataType {
  _id: string;
}

export interface TestomonialsDataResponse extends PageStatus {
  testomonial_data: TestomonialsType[];
}

export interface TestomonialsApiResponse extends MessageStatus {
  data: TestomonialsDataResponse;
}

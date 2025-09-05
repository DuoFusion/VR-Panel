import { CommonDataType, MessageStatus } from "./Common";

interface socialMedia {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
}

export interface WebSettingFormValues {
  name?: string;
  email?: string;
  phoneNumber?: number | null;
  socialMedia?: socialMedia;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
}

export interface WebSettingType extends WebSettingFormValues, CommonDataType {
  _id?: string;
}

export interface WebSettingApiResponse extends MessageStatus {
  data: WebSettingType;
}

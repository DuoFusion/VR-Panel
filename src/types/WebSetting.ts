import { CommonDataType, MessageStatus } from "./Common";

interface socialMedia {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface WebSettingFormValues {
  email?: string;
  phoneNumber?: number | null;
  address?: string;
  whatsappNumber?: number | null;
  whatsappMessage?: string;
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

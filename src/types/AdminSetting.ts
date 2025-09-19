import { CommonDataType, MessageStatus } from "./Common";

export interface AdminSettingFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number | null;
  profilePhoto?: string | string[] | any;
  whatsappKey?: string;
  whatsappUrl?: string;
  senderEmail?: string;
  emailPassword?: string;
}

export interface AdminSettingType extends AdminSettingFormValues, CommonDataType {
  _id?: string;
  userType?: string;
}

export interface AdminSettingApiResponse extends MessageStatus {
  data: AdminSettingType;
}

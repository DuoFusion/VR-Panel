import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface BannerFormValues {
  type?: string;
  title?: string;
  subTitle?: string;
  cta?: string;
  image?: string | string[];
  priority?: number;
}

export interface BannerType extends BannerFormValues, CommonDataType {
  _id: string;
}

export interface BannerDataResponse extends PageStatus {
  banner_data: BannerType[];
}

export interface BannerApiResponse extends MessageStatus {
  data: BannerDataResponse;
}

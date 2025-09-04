import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface socialMedia {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  x?: string;
}

export interface MentorsFormValues {
  image?: string | string[];
  name?: string;
  role?: string;
  experience?: string;
  priority?: number;
  socialMedia?: socialMedia;
}

export interface MentorsType extends MentorsFormValues, CommonDataType {
  _id: string;
}

export interface MentorsDataResponse extends PageStatus {
  mentors_data: MentorsType[];
}

export interface MentorsApiResponse extends MessageStatus {
  data: MentorsDataResponse;
}

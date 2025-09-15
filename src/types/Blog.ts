import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface BlogFormValues {
  priority?: number;
  thumbnailImage?: string | string[];
  blogImage?: string | string[];
  title?: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  features?: boolean;
}

export interface BlogType extends BlogFormValues, CommonDataType {
  _id: string;
}

export interface BlogDataResponse extends PageStatus {
  blog_data: BlogType[];
}

export interface BlogApiResponse extends MessageStatus {
  data: BlogDataResponse;
}

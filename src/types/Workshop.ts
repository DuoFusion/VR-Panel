import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface WorkshopFormValues {
  title?: string;
  shortDescription?: string;
  date?: string;
  time?: string;
  duration?: string;
  instructorImage?: string | string[];
  instructorName?: string;
  thumbnailImage?: string | string[];
  workshopImage?: string | string[];
  price?: number;
  mrp?: number;
  priority?: number;
  fullDescription?: string;
  features?: boolean;
}

export interface WorkshopType extends WorkshopFormValues, CommonDataType {
  _id: string;
}

export interface WorkshopDataResponse extends PageStatus {
  workshop_data: WorkshopType[];
}

export interface WorkshopApiResponse extends MessageStatus {
  data: WorkshopDataResponse;
}

import { CommonDataType, MessageStatus, PageStatus, TypeFilterOption } from "./Common";
import { LanguagesType } from "./Languages";

export interface WorkshopFormValues {
  title?: string;
  // shortDescription?: string;
  // date?: string;
  // time?: string;
  duration?: string;
  instructorImage?: string | string[];
  instructorName?: string;
  languageId?: TypeFilterOption[];
  thumbnailImage?: string | string[];
  workshopImage?: string | string[];
  price?: number;
  // mrp?: number;
  priority?: number;
  // fullDescription?: string;
  features?: boolean;
}

export interface WorkshopType extends Omit<Required<WorkshopFormValues>, "languageId">, CommonDataType {
  _id: string;
  languageId: LanguagesType[];
}

export interface WorkshopDataResponse extends PageStatus {
  workshop_data: WorkshopType[];
}

export interface WorkshopApiResponse extends MessageStatus {
  data: WorkshopDataResponse;
}

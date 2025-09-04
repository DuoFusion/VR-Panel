import { CategoryType } from "./Category";
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
  categoryId?: string;
  status?: string;
  priority?: number;
  fullDescription?: string;
  syllabus?: string;
  faq?: FAQ[];
  features?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface WorkshopType extends Omit<Required<WorkshopFormValues>, "categoryId">, CommonDataType {
  _id: string;
  categoryId: CategoryType;
}

export interface WorkshopDataResponse extends PageStatus {
  workshop_data: WorkshopType[];
}

export interface WorkshopApiResponse extends MessageStatus {
  data: WorkshopDataResponse;
}

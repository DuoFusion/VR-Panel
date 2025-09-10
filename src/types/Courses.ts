import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { LanguagesType } from "./Languages";

export interface ListOfLectureType {
  title: string;
  description: string;
}

export interface CoursesFormValues {
  title?: string;
  subtitle?: string;
  // background?: string;
  duration?: string;
  price?: number;
  mrp?: number;
  totalLectures?: number;
  totalHours?: string;
  priority?: number;
  whatWillYouLearn?: string;
  instructorName?: string;
  languageId?: string;
  // shortDescription?: string;
  language?: string;
  instructorImage?: string | string[];
  courseImage?: string | string[];
  thumbnailImage?: string | string[];
  // listOfLecture?: ListOfLectureType[];
  features?: boolean;
}

export interface CoursesType extends Omit<Required<CoursesFormValues>, "languageId">, CommonDataType {
  _id: string;
  languageId: LanguagesType;
}

export interface CoursesDataResponse extends PageStatus {
  course_data: CoursesType[];
}

export interface CoursesApiResponse extends MessageStatus {
  data: CoursesDataResponse;
}

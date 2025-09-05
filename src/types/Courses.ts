import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface ListOfLectureType {
  title: string;
  description: string;
}

export interface CoursesFormValues {
  title?: string;
  subtitle?: string;
  background?: string;
  duration?: string;
  price?: number;
  totalLectures?: number;
  totalHours?: string;
  priority?: number;
  instructorName?: string;
  mrp?: number;
  shortDescription?: string;
  instructorImage?: string | string[];
  courseImage?: string | string[];
  listOfLecture?: ListOfLectureType[];
  features?: boolean;
}

export interface CoursesType extends CoursesFormValues, CommonDataType {
  _id: string;
}

export interface CoursesDataResponse extends PageStatus {
  course_data: CoursesType[];
}

export interface CoursesApiResponse extends MessageStatus {
  data: CoursesDataResponse;
}

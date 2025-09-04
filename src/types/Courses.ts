import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { LanguagesType } from "./Languages";
import { SkillLevelType } from "./SkillLevel";
import { WhatYouLearnType } from "./WhatYouLearn";

export interface FAQType {
  question: string;
  answer: string;
}

export interface ListOfLectureType {
  title: string;
  description: string;
}

export interface TestimonialsType {
  image: string | string[] | null;
  name: string;
  role: string;
  message: string;
  rating: number;
}

export interface CoursesFormValues {
  title?: string;
  subtitle?: string;
  background?: string;
  duration?: string;
  skillLevelId?: string;
  price?: number;
  totalLectures?: number;
  totalHours?: string;
  priority?: number;
  rating?: number;
  whatYouLearnId?: string;
  instructorName?: string;
  courseLanguageId?: string;
  mrp?: number;
  discount?: string;
  shortDescription?: string;
  instructorImage?: string | string[];
  courseImage?: string | string[];
  faq?: FAQType[];
  listOfLecture?: ListOfLectureType[];
  testimonials?: TestimonialsType[];
  features?: boolean;
}

export interface CoursesType extends Omit<Required<CoursesFormValues>, "skillLevelId" | "whatYouLearnId" | "courseLanguageId">, CommonDataType {
  _id: string;
  skillLevelId: SkillLevelType;
  whatYouLearnId: WhatYouLearnType;
  courseLanguageId: LanguagesType;
}

export interface CoursesDataResponse extends PageStatus {
  course_data: CoursesType[];
}

export interface CoursesApiResponse extends MessageStatus {
  data: CoursesDataResponse;
}

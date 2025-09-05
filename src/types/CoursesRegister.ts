import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { CoursesType } from "./Courses";

export interface CoursesRegisterFormValues {
  name?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  paymentMethod?: string;
  transactionId?: string;
  paymentStatus?: string;
  courseId?: string;
  profession?: string;
  fees?: number;
}

export interface CoursesRegisterType extends Omit<Required<CoursesRegisterFormValues>, "courseId" >, CommonDataType {
  _id: string;
  courseId: CoursesType;
}

export interface CoursesRegisterDataResponse extends PageStatus {
  courseRegister_data: CoursesRegisterType[];
}

export interface CoursesRegisterApiResponse extends MessageStatus {
  data: CoursesRegisterDataResponse;
}

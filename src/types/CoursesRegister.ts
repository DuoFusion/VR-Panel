import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { CoursesType } from "./Courses";

export interface CoursesRegisterFormValues {
  courseId?: string;
  name?: string;
  gender?: string;
  standard?: string;
  schoolName?: string;
  city?: string;
  whatsAppNumber?: string;
  email?: string;
  previousPercentage?: number;
  targetPercentage?: number;
  goal?: string;
  fees?: number;
  paymentStatus?: string;
  transactionId?: string;
}

export interface CoursesRegisterType extends Omit<Required<CoursesRegisterFormValues>, "courseId">, CommonDataType {
  _id: string;
  courseId: CoursesType;
}

export interface CoursesRegisterDataResponse extends PageStatus {
  courseRegister_data: CoursesRegisterType[];
}

export interface CoursesRegisterApiResponse extends MessageStatus {
  data: CoursesRegisterDataResponse;
}

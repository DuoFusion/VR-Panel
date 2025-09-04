import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { CouponCodeType } from "./CouponCode";
import { CoursesType } from "./Courses";

export interface CoursesRegisterFormValues {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  paymentMethod?: string;
  transactionId?: string;
  paymentStatus?: string;
  courseId?: string;
  couponCodeId?: string;
  profession?: string;
  fees?: number;
}

export interface CoursesRegisterType extends Omit<Required<CoursesRegisterFormValues>, "courseId" | "couponCodeId">, CommonDataType {
  _id: string;
  courseId: CoursesType;
  couponCodeId: CouponCodeType;
}

export interface CoursesRegisterDataResponse extends PageStatus {
  courseRegister_data: CoursesRegisterType[];
}

export interface CoursesRegisterApiResponse extends MessageStatus {
  data: CoursesRegisterDataResponse;
}

import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { WorkshopType } from "./Workshop";

export interface WorkshopRegisterFormValues {
  workshopId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  profession?: string;
  paymentStatus?: string;
  fees?: number;
  paymentMethod?: string;
  transactionId?: string;
}

export interface WorkshopRegisterType extends Omit<Required<WorkshopRegisterFormValues>, "workshopId" >, CommonDataType {
  _id: string;
  workshopId: WorkshopType;
}

export interface WorkshopRegisterDataResponse extends PageStatus {
  workshopRegister_data: WorkshopRegisterType[];
}

export interface WorkshopRegisterApiResponse extends MessageStatus {
  data: WorkshopRegisterDataResponse;
}

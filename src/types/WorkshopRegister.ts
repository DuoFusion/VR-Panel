import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { WorkshopType } from "./Workshop";

export interface WorkshopRegisterFormValues {
  workshopId?: string;
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

import { CommonDataType, MessageStatus, PageStatus } from "./Common";
import { InterestType } from "./Interest";

export interface LeadFormType extends CommonDataType {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  interestId: InterestType;
  preferredLearningMode: string;
  background: string;
  itKnowledgeLevel: string;
  additionalMessage: string;
}

export interface LeadFormDataResponse extends PageStatus {
  leadForm_data: LeadFormType[];
}

export interface LeadFormApiResponse extends MessageStatus {
  data: LeadFormDataResponse;
}

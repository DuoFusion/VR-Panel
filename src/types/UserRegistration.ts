import { MessageStatus, PageStatus } from "./Common";

export interface RegistrationType {
  registrationId: string;
  registeredAt: string;
  _id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
}

export interface UserRegistrationType {
  name: string;
  email: string;
  whatsAppNumber: string;
  courses: RegistrationType[];
  workshops: RegistrationType[];
}

export interface UserRegistrationDataResponse extends PageStatus {
  users: UserRegistrationType[];
}

export interface UserRegistrationApiResponse extends MessageStatus {
  data: UserRegistrationDataResponse;
}

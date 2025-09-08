import { MessageStatus, PageStatus } from "./Common";

export interface UserRegistrationDataResponse extends PageStatus {
  users: [];
}

export interface UserRegistrationApiResponse extends MessageStatus {
  data: UserRegistrationDataResponse;
}

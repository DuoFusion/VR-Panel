import { Key } from "react";

export interface MessageFormValues {
  studentIds?: Key[];
  message?: string;
  imageUrl?: string | string[];
}

export interface EmailMessageFormValues {
  to?: Key[];
  subject?: string;
  message?: string;
}

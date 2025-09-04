import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface CategoryFormValues {
  name?: string;
  priority?: string;
}

export interface CategoryType extends Required<CategoryFormValues>, CommonDataType {
  _id: string;
}

export interface CategoryDataResponse extends PageStatus {
  category_data: CategoryType[];
}

export interface CategoryApiResponse extends MessageStatus {
  data: CategoryDataResponse;
}

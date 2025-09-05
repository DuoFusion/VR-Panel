import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface AchievementsFormValues {
  title?: string;
  image?: string | string[];
  priority?: number;
}

export interface AchievementsType extends AchievementsFormValues, CommonDataType {
  _id: string;
}

export interface AchievementsDataResponse extends PageStatus {
  achievements_data: AchievementsType[];
}

export interface AchievementsApiResponse extends MessageStatus {
  data: AchievementsDataResponse;
}

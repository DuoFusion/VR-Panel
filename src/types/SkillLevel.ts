import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface SkillLevelFormValues {
  title?: string;
  priority?: number;
}

export interface SkillLevelType extends SkillLevelFormValues, CommonDataType {
  _id: string;
}

export interface SkillLevelDataResponse extends PageStatus {
  skill_level_data: SkillLevelType[];
}

export interface SkillLevelApiResponse extends MessageStatus {
  data: SkillLevelDataResponse;
}

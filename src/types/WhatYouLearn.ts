import { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface WhatYouLearnFormValues {
  title?: string;
  priority?: number;
}

export interface WhatYouLearnType extends WhatYouLearnFormValues, CommonDataType {
  _id: string;
}

export interface WhatYouLearnDataResponse extends PageStatus {
  what_you_learn_data: WhatYouLearnType[];
}

export interface WhatYouLearnApiResponse extends MessageStatus {
  data: WhatYouLearnDataResponse;
}

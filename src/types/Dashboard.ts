import { MessageStatus } from "./Common";

export interface CountsType {
  workshops: number;
  workshopRegisters: number;
  courses: number;
  courseRegisters: number;
  testimonials: number;
  faqs: number;
  userRegistrations: number;
  languages: number;
  blogs: number;
  newsletters: number;
  contacts: number;
  achievements: number;
}

export interface ProfitType {
  totalCoursePayments: number;
  totalWorkshopPayments: number;
  grandTotalPayment: number;
}

export interface DashboardDataResponse extends CountsType {
  profit: ProfitType;
}

export interface DashboardApiResponse extends MessageStatus {
  data: DashboardDataResponse;
}

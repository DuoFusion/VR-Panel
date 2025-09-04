import { KEYS, URL_KEYS } from "../constants";
import { AboutApiResponse, BannerApiResponse, CategoryApiResponse, CouponCodeApiResponse, CoursesApiResponse, CoursesRegisterApiResponse, FaqApiResponse, InterestApiResponse, LanguagesApiResponse, LeadFormApiResponse, MentorsApiResponse, NewsLetterApiResponse, Params, SkillLevelApiResponse, TestomonialsApiResponse, WebSettingApiResponse, WhatYouLearnApiResponse, WorkshopApiResponse } from "../types";
import { WorkshopRegisterApiResponse } from "../types/WorkshopRegister";
import Get from "./Get";
import { useApiGet } from "./hooks";

const Queries = {
  // ************ Category ***********
  useGetCategory: (params: Params) => useApiGet<CategoryApiResponse>([KEYS.CATEGORY.ALL, params], () => Get(URL_KEYS.CATEGORY.ALL, params)),
  // useGetCategory: (params: Params, id?: string) => useApiGet<CategoryApiResponse>([KEYS.CATEGORY.ALL, id, params], () => Get(id ? `${URL_KEYS.CATEGORY.ALL}/${id}` : URL_KEYS.CATEGORY.ALL, params)),

  // ************ Workshop ***********
  useGetWorkshop: (params: Params) => useApiGet<WorkshopApiResponse>([KEYS.WORKSHOP.ALL, params], () => Get(URL_KEYS.WORKSHOP.ALL, params)),

  // ************ Workshop Register ***********
  useGetWorkshopRegister: (params: Params) => useApiGet<WorkshopRegisterApiResponse>([KEYS.WORKSHOP_REGISTER.ALL, params], () => Get(URL_KEYS.WORKSHOP_REGISTER.ALL, params)),

  // ************ Courses ***********
  useGetCourses: (params: Params) => useApiGet<CoursesApiResponse>([KEYS.COURSES.ALL, params], () => Get(URL_KEYS.COURSES.ALL, params)),

  // ************ Courses Register ***********
  useGetCoursesRegister: (params: Params) => useApiGet<CoursesRegisterApiResponse>([KEYS.COURSES_REGISTER.ALL, params], () => Get(URL_KEYS.COURSES_REGISTER.ALL, params)),

  // ************ Languages ***********
  useGetLanguages: (params: Params) => useApiGet<LanguagesApiResponse>([KEYS.LANGUAGE.ALL, params], () => Get(URL_KEYS.LANGUAGE.ALL, params)),

  // ************ Skill Level ***********
  useGetSkillLevel: (params: Params) => useApiGet<SkillLevelApiResponse>([KEYS.SKILL_LEVEL.ALL, params], () => Get(URL_KEYS.SKILL_LEVEL.ALL, params)),

  // ************ What You Learn ***********
  useGetWhatYouLearn: (params: Params) => useApiGet<WhatYouLearnApiResponse>([KEYS.WHAT_YOU_LEARN.ALL, params], () => Get(URL_KEYS.WHAT_YOU_LEARN.ALL, params)),

  // ************ Banner ***********
  useGetBanner: (params: Params) => useApiGet<BannerApiResponse>([KEYS.BANNER.ALL, params], () => Get(URL_KEYS.BANNER.ALL, params)),

  // ************ Mentors ***********
  useGetMentors: (params: Params) => useApiGet<MentorsApiResponse>([KEYS.MENTORS.ALL, params], () => Get(URL_KEYS.MENTORS.ALL, params)),

  // ************ About ***********
  useGetAbout: () => useApiGet<AboutApiResponse>([KEYS.ABOUT.ALL], () => Get(URL_KEYS.ABOUT.ALL)),

  // ************ Testomonials ***********
  useGetTestomonials: (params: Params) => useApiGet<TestomonialsApiResponse>([KEYS.TESTOMONIALS.ALL, params], () => Get(URL_KEYS.TESTOMONIALS.ALL, params)),

  // ************ Faq ***********
  useGetFaq: (params: Params) => useApiGet<FaqApiResponse>([KEYS.FAQ.ALL, params], () => Get(URL_KEYS.FAQ.ALL, params)),

  // ************ Lead Form ***********
  useGetLeadForm: (params: Params) => useApiGet<LeadFormApiResponse>([KEYS.LEAD_FORM.ALL, params], () => Get(URL_KEYS.LEAD_FORM.ALL, params)),

  // ************ Coupon Code ***********
  useGetCouponCode: (params: Params) => useApiGet<CouponCodeApiResponse>([KEYS.COUPON_CODE.ALL, params], () => Get(URL_KEYS.COUPON_CODE.ALL, params)),

  // ************ Interest ***********
  useGetInterest: (params: Params) => useApiGet<InterestApiResponse>([KEYS.INTEREST.ALL, params], () => Get(URL_KEYS.INTEREST.ALL, params)),

  // ************ Web Setting ***********
  useGetWebSetting: () => useApiGet<WebSettingApiResponse>([KEYS.WEB_SETTING.ALL], () => Get(URL_KEYS.WEB_SETTING.ALL)),

  // ************ News Letter ***********
  useGetNewsLetter: (params: Params) => useApiGet<NewsLetterApiResponse>([KEYS.NEWS_LETTER.ALL, params], () => Get(URL_KEYS.NEWS_LETTER.ALL, params)),
};

export default Queries;

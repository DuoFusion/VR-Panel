import { KEYS, URL_KEYS } from "../constants";
import { AboutApiResponse, AchievementsApiResponse, AdminSettingApiResponse, BannerApiResponse, BlogApiResponse, ContactUsApiResponse, CoursesApiResponse, CoursesRegisterApiResponse, FaqApiResponse, LanguagesApiResponse, NewsLetterApiResponse, Params, TestomonialsApiResponse, UserRegistrationApiResponse, WebSettingApiResponse, WorkshopApiResponse } from "../types";
import { WorkshopRegisterApiResponse } from "../types/WorkshopRegister";
import Get from "./Get";
import { useApiGet } from "./hooks";

const Queries = {
  // ************ Workshop ***********
  useGetWorkshop: (params: Params) => useApiGet<WorkshopApiResponse>([KEYS.WORKSHOP.ALL, params], () => Get(URL_KEYS.WORKSHOP.ALL, params)),

  // ************ Workshop Register ***********
  useGetWorkshopRegister: (params: Params) => useApiGet<WorkshopRegisterApiResponse>([KEYS.WORKSHOP_REGISTER.ALL, params], () => Get(URL_KEYS.WORKSHOP_REGISTER.ALL, params)),

  // ************ Courses ***********
  useGetCourses: (params: Params) => useApiGet<CoursesApiResponse>([KEYS.COURSES.ALL, params], () => Get(URL_KEYS.COURSES.ALL, params)),

  // ************ Courses Register ***********
  useGetCoursesRegister: (params: Params) => useApiGet<CoursesRegisterApiResponse>([KEYS.COURSES_REGISTER.ALL, params], () => Get(URL_KEYS.COURSES_REGISTER.ALL, params)),

  // ************ Banner ***********
  useGetBanner: (params: Params) => useApiGet<BannerApiResponse>([KEYS.BANNER.ALL, params], () => Get(URL_KEYS.BANNER.ALL, params)),

  // ************ Achievements ***********
  useGetAchievements: (params: Params) => useApiGet<AchievementsApiResponse>([KEYS.ACHIEVEMENTS.ALL, params], () => Get(URL_KEYS.ACHIEVEMENTS.ALL, params)),

  // ************ Testomonials ***********
  useGetTestomonials: (params: Params) => useApiGet<TestomonialsApiResponse>([KEYS.TESTOMONIALS.ALL, params], () => Get(URL_KEYS.TESTOMONIALS.ALL, params)),

  // ************ Faq ***********
  useGetFaq: (params: Params) => useApiGet<FaqApiResponse>([KEYS.FAQ.ALL, params], () => Get(URL_KEYS.FAQ.ALL, params)),

  // ************ Web Setting ***********
  useGetWebSetting: () => useApiGet<WebSettingApiResponse>([KEYS.WEB_SETTING.ALL], () => Get(URL_KEYS.WEB_SETTING.ALL)),

  // ************ Admin Setting ***********
  useGetAdminSetting: (id: string) => useApiGet<AdminSettingApiResponse>([KEYS.ADMIN_SETTING.ALL, id], () => Get(`${URL_KEYS.ADMIN_SETTING.ALL}/${id}`)),

  // ************ About ***********
  useGetAbout: () => useApiGet<AboutApiResponse>([KEYS.ABOUT.ALL], () => Get(URL_KEYS.ABOUT.ALL)),

  // ************ Languages ***********
  useGetLanguages: (params: Params) => useApiGet<LanguagesApiResponse>([KEYS.LANGUAGE.ALL, params], () => Get(URL_KEYS.LANGUAGE.ALL, params)),

  // ************ User Registration ***********
  useGetUserRegistration: (params: Params) => useApiGet<UserRegistrationApiResponse>([KEYS.USER_REGISTRATION.ALL, params], () => Get(URL_KEYS.USER_REGISTRATION.ALL, params)),

  // ************ News Letter ***********
  useGetNewsLetter: (params: Params) => useApiGet<NewsLetterApiResponse>([KEYS.NEWS_LETTER.ALL, params], () => Get(URL_KEYS.NEWS_LETTER.ALL, params)),

  // ************ Blog ***********
  useGetBlog: (params: Params) => useApiGet<BlogApiResponse>([KEYS.BLOG.ALL, params], () => Get(URL_KEYS.BLOG.ALL, params)),

  // ************ Contact Us ***********
  useGetContactUs: (params: Params) => useApiGet<ContactUsApiResponse>([KEYS.CONTACT_US.ALL, params], () => Get(URL_KEYS.CONTACT_US.ALL, params)),
};

export default Queries;

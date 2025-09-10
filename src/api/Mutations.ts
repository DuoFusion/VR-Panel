import { KEYS, URL_KEYS } from "../constants";
import { AboutType, AchievementsFormValues, AdminSettingFormValues, BannerFormValues, BlogFormValues, ChangePasswordPayload, CoursesFormValues, CoursesRegisterFormValues, FaqFormValues, LanguagesFormValues, LoginPayload, LoginResponse, TestomonialsFormValues, UploadResponse, WebSettingFormValues, WorkshopFormValues, WorkshopRegisterFormValues } from "../types";
import Delete from "./Delete";
import { useApiDelete, useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // ************ Auth ***********
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(URL_KEYS.AUTH.LOGIN, input, false)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(URL_KEYS.AUTH.CHANGE_PASSWORD, input)),

  // ************ Workshop ***********
  useWorkshop: () => useApiPost<WorkshopFormValues, void>([KEYS.WORKSHOP.ADD, KEYS.WORKSHOP.ALL], (input) => Post(URL_KEYS.WORKSHOP.ADD, input)),
  useEditWorkshop: () => useApiPost<{ workshopId: string } & WorkshopFormValues, void>([KEYS.WORKSHOP.EDIT, KEYS.WORKSHOP.ALL], (input) => Post(URL_KEYS.WORKSHOP.EDIT, input)),
  useDeleteWorkshop: () => useApiDelete<string, void>([KEYS.WORKSHOP.DELETE, KEYS.WORKSHOP.ALL], (id) => Delete(`${URL_KEYS.WORKSHOP.DELETE}/${id}`)),
  useHandleActive: () => useApiPost<{ workshopId: string; isBlocked?: boolean; features?: boolean }, void>([KEYS.WORKSHOP.EDIT, KEYS.WORKSHOP.ALL], (input) => Post(URL_KEYS.WORKSHOP.EDIT, input)),

  // ************ Workshop Register ***********
  useDeleteWorkshopRegister: () => useApiDelete<string, void>([KEYS.WORKSHOP_REGISTER.DELETE, KEYS.WORKSHOP_REGISTER.ALL], (id) => Delete(`${URL_KEYS.WORKSHOP_REGISTER.DELETE}/${id}`)),
  useEditWorkshopRegister: () => useApiPost<{ workshopRegisterId: string } & WorkshopRegisterFormValues, void>([KEYS.WORKSHOP_REGISTER.EDIT, KEYS.WORKSHOP_REGISTER.ALL], (input) => Post(URL_KEYS.WORKSHOP_REGISTER.EDIT, input)),

  // ************ Upload ***********
  useUpload: () => useApiPost<FormData, UploadResponse>([KEYS.UPLOAD.ADD], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),
  // useDeleteUpload: () => useApiDelete<{ imageUrl: string }, void>([KEYS.UPLOAD.DELETE_UPLOAD, KEYS.UPLOAD.ALL_UPLOAD], (id) => Delete(`${URL_KEYS.Upload.Delete}`, id)),

  // ************ Courses ***********
  useCourses: () => useApiPost<CoursesFormValues, void>([KEYS.COURSES.ADD, KEYS.COURSES.ALL], (input) => Post(URL_KEYS.COURSES.ADD, input)),
  useEditCourses: () => useApiPost<{ courseId: string } & CoursesFormValues, void>([KEYS.COURSES.EDIT, KEYS.COURSES.ALL], (input) => Post(URL_KEYS.COURSES.EDIT, input)),
  useDeleteCourses: () => useApiDelete<string, void>([KEYS.COURSES.DELETE, KEYS.COURSES.ALL], (id) => Delete(`${URL_KEYS.COURSES.DELETE}/${id}`)),
  useCoursesHandleActive: () => useApiPost<{ courseId: string; isBlocked?: boolean; features?: boolean }, void>([KEYS.COURSES.EDIT, KEYS.COURSES.ALL], (input) => Post(URL_KEYS.COURSES.EDIT, input)),

  // ************ Courses Register ***********
  useEditCoursesRegister: () => useApiPost<{ courseRegisterId: string } & CoursesRegisterFormValues, void>([KEYS.COURSES_REGISTER.EDIT, KEYS.COURSES_REGISTER.ALL], (input) => Post(URL_KEYS.COURSES_REGISTER.EDIT, input)),
  useDeleteCoursesRegister: () => useApiDelete<string, void>([KEYS.COURSES_REGISTER.DELETE, KEYS.COURSES_REGISTER.ALL], (id) => Delete(`${URL_KEYS.COURSES_REGISTER.DELETE}/${id}`)),

  // ************ Banner ***********
  useBanner: () => useApiPost<BannerFormValues, void>([KEYS.BANNER.ADD, KEYS.BANNER.ALL], (input) => Post(URL_KEYS.BANNER.ADD, input)),
  useEditBanner: () => useApiPost<{ bannerId: string } & BannerFormValues, void>([KEYS.BANNER.EDIT, KEYS.BANNER.ALL], (input) => Post(URL_KEYS.BANNER.EDIT, input)),
  useDeleteBanner: () => useApiDelete<string, void>([KEYS.BANNER.DELETE, KEYS.BANNER.ALL], (id) => Delete(`${URL_KEYS.BANNER.DELETE}/${id}`)),

  // ************ Achievements ***********
  useAchievements: () => useApiPost<AchievementsFormValues, void>([KEYS.ACHIEVEMENTS.ADD, KEYS.ACHIEVEMENTS.ALL], (input) => Post(URL_KEYS.ACHIEVEMENTS.ADD, input)),
  useEditAchievements: () => useApiPost<{ achievementId: string } & AchievementsFormValues, void>([KEYS.ACHIEVEMENTS.EDIT, KEYS.ACHIEVEMENTS.ALL], (input) => Post(URL_KEYS.ACHIEVEMENTS.EDIT, input)),
  useDeleteAchievements: () => useApiDelete<string, void>([KEYS.ACHIEVEMENTS.DELETE, KEYS.ACHIEVEMENTS.ALL], (id) => Delete(`${URL_KEYS.ACHIEVEMENTS.DELETE}/${id}`)),

  // ************ Testomonials ***********
  useTestomonials: () => useApiPost<TestomonialsFormValues, void>([KEYS.TESTOMONIALS.ADD, KEYS.TESTOMONIALS.ALL], (input) => Post(URL_KEYS.TESTOMONIALS.ADD, input)),
  useEditTestomonials: () => useApiPost<{ testimonialId: string } & TestomonialsFormValues, void>([KEYS.TESTOMONIALS.EDIT, KEYS.TESTOMONIALS.ALL], (input) => Post(URL_KEYS.TESTOMONIALS.EDIT, input)),
  useDeleteTestomonials: () => useApiDelete<string, void>([KEYS.TESTOMONIALS.DELETE, KEYS.TESTOMONIALS.ALL], (id) => Delete(`${URL_KEYS.TESTOMONIALS.DELETE}/${id}`)),

  // ************ Faq ***********
  useFaq: () => useApiPost<FaqFormValues, void>([KEYS.FAQ.ADD, KEYS.FAQ.ALL], (input) => Post(URL_KEYS.FAQ.ADD, input)),
  useEditFaq: () => useApiPost<{ faqId: string } & FaqFormValues, void>([KEYS.FAQ.EDIT, KEYS.FAQ.ALL], (input) => Post(URL_KEYS.FAQ.EDIT, input)),
  useDeleteFaq: () => useApiDelete<string, void>([KEYS.FAQ.DELETE, KEYS.FAQ.ALL], (id) => Delete(`${URL_KEYS.FAQ.DELETE}/${id}`)),

  // ************ Web Setting ***********
  useWebSetting: () => useApiPost<Partial<WebSettingFormValues>, void>([KEYS.WEB_SETTING.ADD_EDIT, KEYS.WEB_SETTING.ALL], (input) => Post(URL_KEYS.WEB_SETTING.ADD_EDIT, input)),

  // ************ Admin Setting ***********
  useAdminSetting: () => useApiPost<Partial<{ profileId: string } & AdminSettingFormValues>, void>([KEYS.ADMIN_SETTING.ADD_EDIT, KEYS.ADMIN_SETTING.ALL], (input) => Post(URL_KEYS.ADMIN_SETTING.ADD_EDIT, input)),

  // ************ About ***********
  useAbout: () => useApiPost<Partial<AboutType>, void>([KEYS.ABOUT.ADD_EDIT, KEYS.ABOUT.ALL], (input) => Post(URL_KEYS.ABOUT.ADD_EDIT, input)),

  // ************ Language ***********
  useLanguages: () => useApiPost<LanguagesFormValues, void>([KEYS.LANGUAGE.ADD, KEYS.LANGUAGE.ALL], (input) => Post(URL_KEYS.LANGUAGE.ADD, input)),
  useEditLanguages: () => useApiPost<{ languageId: string } & LanguagesFormValues, void>([KEYS.LANGUAGE.EDIT, KEYS.LANGUAGE.ALL], (input) => Post(URL_KEYS.LANGUAGE.EDIT, input)),
  useDeleteLanguages: () => useApiDelete<string, void>([KEYS.LANGUAGE.DELETE, KEYS.LANGUAGE.ALL], (id) => Delete(`${URL_KEYS.LANGUAGE.DELETE}/${id}`)),

  // ************ News Letter ***********
  useDeleteNewsLetter: () => useApiDelete<string, void>([KEYS.NEWS_LETTER.DELETE, KEYS.NEWS_LETTER.ALL], (id) => Delete(`${URL_KEYS.NEWS_LETTER.DELETE}/${id}`)),

  // ************ Blog ***********
  useBlog: () => useApiPost<BlogFormValues, void>([KEYS.BLOG.ADD, KEYS.BLOG.ALL], (input) => Post(URL_KEYS.BLOG.ADD, input)),
  useEditBlog: () => useApiPost<{ blogId: string } & BlogFormValues, void>([KEYS.BLOG.EDIT, KEYS.BLOG.ALL], (input) => Post(URL_KEYS.BLOG.EDIT, input)),
  useDeleteBlog: () => useApiDelete<string, void>([KEYS.BLOG.DELETE, KEYS.BLOG.ALL], (id) => Delete(`${URL_KEYS.BLOG.DELETE}/${id}`)),
};

export default Mutations;

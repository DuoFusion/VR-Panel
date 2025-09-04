import { KEYS, URL_KEYS } from "../constants";
import { AboutType, BannerFormValues, CategoryFormValues, ChangePasswordPayload, CouponCodeFormValues, CoursesFormValues, CoursesRegisterFormValues, FaqFormValues, InterestFormValues, LanguagesFormValues, LoginPayload, LoginResponse, MentorsFormValues, SkillLevelFormValues, TestomonialsFormValues, UploadResponse, WebSettingFormValues, WhatYouLearnFormValues, WorkshopFormValues, WorkshopRegisterFormValues } from "../types";
import Delete from "./Delete";
import { useApiDelete, useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // ************ Auth ***********
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(URL_KEYS.AUTH.LOGIN, input, false)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(URL_KEYS.AUTH.CHANGE_PASSWORD, input)),

  // ************ Category ***********
  useCategory: () => useApiPost<CategoryFormValues, void>([KEYS.CATEGORY.ADD, KEYS.CATEGORY.ALL], (input) => Post(URL_KEYS.CATEGORY.ADD, input)),
  useEditCategory: () => useApiPost<{ categoryId: string } & CategoryFormValues, void>([KEYS.CATEGORY.EDIT, KEYS.CATEGORY.ALL], (input) => Post(URL_KEYS.CATEGORY.EDIT, input)),
  useDeleteCategory: () => useApiDelete<string, void>([KEYS.CATEGORY.DELETE, KEYS.CATEGORY.ALL], (id) => Delete(`${URL_KEYS.CATEGORY.DELETE}/${id}`)),

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

  // ************ Language ***********
  useLanguages: () => useApiPost<LanguagesFormValues, void>([KEYS.LANGUAGE.ADD, KEYS.LANGUAGE.ALL], (input) => Post(URL_KEYS.LANGUAGE.ADD, input)),
  useEditLanguages: () => useApiPost<{ languageId: string } & LanguagesFormValues, void>([KEYS.LANGUAGE.EDIT, KEYS.LANGUAGE.ALL], (input) => Post(URL_KEYS.LANGUAGE.EDIT, input)),
  useDeleteLanguages: () => useApiDelete<string, void>([KEYS.LANGUAGE.DELETE, KEYS.LANGUAGE.ALL], (id) => Delete(`${URL_KEYS.LANGUAGE.DELETE}/${id}`)),

  // ************ Skill Level ***********
  useSkillLevel: () => useApiPost<SkillLevelFormValues, void>([KEYS.SKILL_LEVEL.ADD, KEYS.SKILL_LEVEL.ALL], (input) => Post(URL_KEYS.SKILL_LEVEL.ADD, input)),
  useEditSkillLevel: () => useApiPost<{ skillLevelId: string } & SkillLevelFormValues, void>([KEYS.SKILL_LEVEL.EDIT, KEYS.SKILL_LEVEL.ALL], (input) => Post(URL_KEYS.SKILL_LEVEL.EDIT, input)),
  useDeleteSkillLevel: () => useApiDelete<string, void>([KEYS.SKILL_LEVEL.DELETE, KEYS.SKILL_LEVEL.ALL], (id) => Delete(`${URL_KEYS.SKILL_LEVEL.DELETE}/${id}`)),

  // ************ What You Learn ***********
  useWhatYouLearn: () => useApiPost<WhatYouLearnFormValues, void>([KEYS.WHAT_YOU_LEARN.ADD, KEYS.WHAT_YOU_LEARN.ALL], (input) => Post(URL_KEYS.WHAT_YOU_LEARN.ADD, input)),
  useEditWhatYouLearn: () => useApiPost<{ whatYouLearnId: string } & WhatYouLearnFormValues, void>([KEYS.WHAT_YOU_LEARN.EDIT, KEYS.WHAT_YOU_LEARN.ALL], (input) => Post(URL_KEYS.WHAT_YOU_LEARN.EDIT, input)),
  useDeleteWhatYouLearn: () => useApiDelete<string, void>([KEYS.WHAT_YOU_LEARN.DELETE, KEYS.WHAT_YOU_LEARN.ALL], (id) => Delete(`${URL_KEYS.WHAT_YOU_LEARN.DELETE}/${id}`)),

  // ************ Banner ***********
  useBanner: () => useApiPost<BannerFormValues, void>([KEYS.BANNER.ADD, KEYS.BANNER.ALL], (input) => Post(URL_KEYS.BANNER.ADD, input)),
  useEditBanner: () => useApiPost<{ bannerId: string } & BannerFormValues, void>([KEYS.BANNER.EDIT, KEYS.BANNER.ALL], (input) => Post(URL_KEYS.BANNER.EDIT, input)),
  useDeleteBanner: () => useApiDelete<string, void>([KEYS.BANNER.DELETE, KEYS.BANNER.ALL], (id) => Delete(`${URL_KEYS.BANNER.DELETE}/${id}`)),

  // ************ Mentors ***********
  useMentors: () => useApiPost<MentorsFormValues, void>([KEYS.MENTORS.ADD, KEYS.MENTORS.ALL], (input) => Post(URL_KEYS.MENTORS.ADD, input)),
  useEditMentors: () => useApiPost<{ mentorsId: string } & MentorsFormValues, void>([KEYS.MENTORS.EDIT, KEYS.MENTORS.ALL], (input) => Post(URL_KEYS.MENTORS.EDIT, input)),
  useDeleteMentors: () => useApiDelete<string, void>([KEYS.MENTORS.DELETE, KEYS.MENTORS.ALL], (id) => Delete(`${URL_KEYS.MENTORS.DELETE}/${id}`)),

  // ************ About ***********
  useAbout: () => useApiPost<Partial<AboutType>, void>([KEYS.ABOUT.ADD_EDIT, KEYS.ABOUT.ALL], (input) => Post(URL_KEYS.ABOUT.ADD_EDIT, input)),

  // ************ Testomonials ***********
  useTestomonials: () => useApiPost<TestomonialsFormValues, void>([KEYS.TESTOMONIALS.ADD, KEYS.TESTOMONIALS.ALL], (input) => Post(URL_KEYS.TESTOMONIALS.ADD, input)),
  useEditTestomonials: () => useApiPost<{ testimonialId: string } & TestomonialsFormValues, void>([KEYS.TESTOMONIALS.EDIT, KEYS.TESTOMONIALS.ALL], (input) => Post(URL_KEYS.TESTOMONIALS.EDIT, input)),
  useDeleteTestomonials: () => useApiDelete<string, void>([KEYS.TESTOMONIALS.DELETE, KEYS.TESTOMONIALS.ALL], (id) => Delete(`${URL_KEYS.TESTOMONIALS.DELETE}/${id}`)),

  // ************ Faq ***********
  useFaq: () => useApiPost<FaqFormValues, void>([KEYS.FAQ.ADD, KEYS.FAQ.ALL], (input) => Post(URL_KEYS.FAQ.ADD, input)),
  useEditFaq: () => useApiPost<{ faqId: string } & FaqFormValues, void>([KEYS.FAQ.EDIT, KEYS.FAQ.ALL], (input) => Post(URL_KEYS.FAQ.EDIT, input)),
  useDeleteFaq: () => useApiDelete<string, void>([KEYS.FAQ.DELETE, KEYS.FAQ.ALL], (id) => Delete(`${URL_KEYS.FAQ.DELETE}/${id}`)),

  // ************ Lead Form ***********
  useDeleteLeadForm: () => useApiDelete<string, void>([KEYS.LEAD_FORM.DELETE, KEYS.LEAD_FORM.ALL], (id) => Delete(`${URL_KEYS.LEAD_FORM.DELETE}/${id}`)),

  // ************ Coupon Code ***********
  useCouponCode: () => useApiPost<CouponCodeFormValues, void>([KEYS.COUPON_CODE.ADD, KEYS.COUPON_CODE.ALL], (input) => Post(URL_KEYS.COUPON_CODE.ADD, input)),
  useEditCouponCode: () => useApiPost<{ couponId: string } & CouponCodeFormValues, void>([KEYS.COUPON_CODE.EDIT, KEYS.COUPON_CODE.ALL], (input) => Post(URL_KEYS.COUPON_CODE.EDIT, input)),
  useDeleteCouponCode: () => useApiDelete<string, void>([KEYS.COUPON_CODE.DELETE, KEYS.COUPON_CODE.ALL], (id) => Delete(`${URL_KEYS.COUPON_CODE.DELETE}/${id}`)),

  // ************ Interest ***********
  useInterest: () => useApiPost<InterestFormValues, void>([KEYS.INTEREST.ADD, KEYS.INTEREST.ALL], (input) => Post(URL_KEYS.INTEREST.ADD, input)),
  useEditInterest: () => useApiPost<{ interestId: string } & InterestFormValues, void>([KEYS.INTEREST.EDIT, KEYS.INTEREST.ALL], (input) => Post(URL_KEYS.INTEREST.EDIT, input)),
  useDeleteInterest: () => useApiDelete<string, void>([KEYS.INTEREST.DELETE, KEYS.INTEREST.ALL], (id) => Delete(`${URL_KEYS.INTEREST.DELETE}/${id}`)),

  // ************ Web Setting ***********
  useWebSetting: () => useApiPost<Partial<WebSettingFormValues>, void>([KEYS.WEB_SETTING.ADD_EDIT, KEYS.WEB_SETTING.ALL], (input) => Post(URL_KEYS.WEB_SETTING.ADD_EDIT, input)),

  // ************ News Letter ***********
  useDeleteNewsLetter: () => useApiDelete<string, void>([KEYS.NEWS_LETTER.DELETE, KEYS.NEWS_LETTER.ALL], (id) => Delete(`${URL_KEYS.NEWS_LETTER.DELETE}/${id}`)),
};

export default Mutations;

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const URL = {
  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot_password",
    VERIFY_OTP: "/auth/verify_otp",
    RESET_PASSWORD: "/auth/reset_password",
    CHANGE_PASSWORD: "/auth/change-password",
  },
  CATEGORY: {
    ALL: "/category",
    ADD: "/category/add",
    EDIT: "/category/edit",
    DELETE: "/category/delete",
  },
  WORKSHOP: {
    ALL: "/workshop",
    ADD: "/workshop/add",
    EDIT: "/workshop/edit",
    DELETE: "/workshop/delete",
  },
  UPLOAD: {
    ADD: "/upload",
    DELETE: "/upload",
  },
  COURSES: {
    ALL: "/courses",
    ADD: "/courses/add",
    EDIT: "/courses/edit",
    DELETE: "/courses/delete",
  },
  LANGUAGE: {
    ALL: "/language",
    ADD: "/language/add",
    EDIT: "/language/edit",
    DELETE: "/language/delete",
  },
  SKILL_LEVEL: {
    ALL: "/skill-level",
    ADD: "/skill-level/add",
    EDIT: "/skill-level/edit",
    DELETE: "/skill-level/delete",
  },
  WHAT_YOU_LEARN: {
    ALL: "/what-you-learn",
    ADD: "/what-you-learn/add",
    EDIT: "/what-you-learn/edit",
    DELETE: "/what-you-learn/delete",
  },
  BANNER: {
    ALL: "/banner",
    ADD: "/banner/add",
    EDIT: "/banner/edit",
    DELETE: "/banner/delete",
  },
  MENTORS: {
    ALL: "/mentors",
    ADD: "/mentors/add",
    EDIT: "/mentors/edit",
    DELETE: "/mentors/delete",
  },
  ABOUT: {
    ALL: "/about",
    ADD_EDIT: "/about/add/edit",
  },
  TESTOMONIALS: {
    ALL: "/testomonial",
    ADD: "/testomonial/add",
    EDIT: "/testomonial/edit",
    DELETE: "/testomonial/delete",
  },
  FAQ: {
    ALL: "/faq",
    ADD: "/faq/add",
    EDIT: "/faq/edit",
    DELETE: "/faq/delete",
  },
  LEAD_FORM: {
    ALL: "/lead-form",
    DELETE: "/lead-form/delete",
  },
  COUPON_CODE: {
    ALL: "/coupon-code",
    ADD: "/coupon-code/add",
    EDIT: "/coupon-code/edit",
    DELETE: "/coupon-code/delete",
  },
  INTEREST: {
    ALL: "/interest",
    ADD: "/interest/add",
    EDIT: "/interest/edit",
    DELETE: "/interest/delete",
  },
  WEB_SETTING: {
    ALL: "/web-setting",
    ADD_EDIT: "/web-setting/add/edit",
  },
  COURSES_REGISTER: {
    ALL: "/course-register",
    EDIT: "/course-register/edit",
    DELETE: "/course-register/delete",
  },
  WORKSHOP_REGISTER: {
    ALL: "/workshop-register",
    EDIT: "/workshop-register/edit",
    DELETE: "/workshop-register/delete",
  },
  NEWS_LETTER: {
    ALL: "/news-letter",
    ADD: "/news-letter",
    EDIT: "/news-letter",
    DELETE: "/news-letter",
  },
} as const;

// Construct the URL object
export const URL_KEYS: { [K in keyof typeof URL]: { [P in keyof (typeof URL)[K]]: string } } = Object.fromEntries(Object.entries(URL).map(([key, subKeys]) => [key, Object.fromEntries(Object.entries(subKeys).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]))])) as {
  [K in keyof typeof URL]: { [P in keyof (typeof URL)[K]]: string };
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",
  Reset_PASSWORD: "/reset-password",
  CHANGE_PASSWORD: "/change-password",
  DASHBOARD: "/dashboard",
  WORKSHOP: {
    WORKSHOP: "/workshop",
    ADD_EDIT_WORKSHOP: "/add-edit-workshop",
  },
  COURSES: {
    COURSES: "/coursers",
    ADD_EDIT_COURSES: "/add-edit-coursers",
  },
  BANNER: {
    BANNER: "/banner",
    ADD_EDIT_BANNER: "/add-edit-banner",
  },
  ACHIEVEMENTS: {
    ACHIEVEMENTS: "/achievements",
    ADD_EDIT_ACHIEVEMENTS: "/add-edit-achievements",
  },
  TESTOMONIALS: {
    TESTOMONIALS: "/testomonials",
    ADD_EDIT_TESTOMONIALS: "/add-edit-testomonials",
  },
  FAQ: {
    FAQ: "/faq",
    ADD_EDIT_FAQ: "/add-edit-faq",
  },
  WEB_SETTING: "/web-setting",
  WORKSHOP_REGISTER: {
    WORKSHOP_REGISTER: "/workshop-register",
    ADD_EDIT_WORKSHOP_REGISTER: "/add-edit-workshop-register",
  },
  COURSES_REGISTER: {
    COURSES_REGISTER: "/coursers-register",
    ADD_EDIT_COURSES_REGISTER: "/add-edit-coursers-register",
  },
} as const;

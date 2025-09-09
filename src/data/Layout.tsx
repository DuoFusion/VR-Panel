import { ROUTES } from "../constants";
import { MenuItem } from "../types";

// ********** Sidebar Data **********

export const menuList: MenuItem[] = [
  { id: 1, title: "dashboard", url: ROUTES.DASHBOARD, icon: "home", type: "link" },
  { id: 2, title: "User Registration", url: ROUTES.USER_REGISTRATION.USER_REGISTRATION, icon: "home", type: "link" },
  { id: 3, title: "Workshop", url: ROUTES.WORKSHOP.WORKSHOP, icon: "knowledgebase", type: "link" },
  { id: 4, title: "Workshop Register", url: ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER, icon: "knowledgebase", type: "link" },
  { id: 5, title: "Courses", url: ROUTES.COURSES.COURSES, icon: "ecommerce", type: "link" },
  { id: 6, title: "Courses Register", url: ROUTES.COURSES_REGISTER.COURSES_REGISTER, icon: "ecommerce", type: "link" },
  { id: 7, title: "Language", url: ROUTES.LANGUAGE.LANGUAGE, icon: "faq", type: "link" },
  { id: 9, title: "Achievements", url: ROUTES.ACHIEVEMENTS.ACHIEVEMENTS, icon: "editors", type: "link" },
  // { id: 10, title: "Banner", url: ROUTES.BANNER.BANNER, icon: "editors", type: "link" },
  { id: 13, title: "Testimonials", url: ROUTES.TESTOMONIALS.TESTOMONIALS, icon: "editors", type: "link" },
  { id: 14, title: "FAQ", url: ROUTES.FAQ.FAQ, icon: "editors", type: "link" },
  { id: 16, title: "About Us", url: ROUTES.ABOUT, icon: "editors", type: "link" },
  { id: 17, title: "Admin Setting", url: ROUTES.ADMIN_SETTING, icon: "editors", type: "link" },
  { id: 18, title: "Web Setting", url: ROUTES.WEB_SETTING, icon: "editors", type: "link" },
   { id: 19, title: "news letter", url: ROUTES.NEWS_LETTER.NEWS_LETTER, icon: "editors", type: "link" },
];

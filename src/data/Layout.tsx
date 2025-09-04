import { ROUTES } from "../constants";
import { MenuItem } from "../types";

// ********** Sidebar Data **********

export const menuList: MenuItem[] = [
  { id: 1, title: "dashboard", url: ROUTES.DASHBOARD, icon: "home", type: "link" },
  { id: 2, title: "category", url: ROUTES.CATEGORY.CATEGORY, icon: "user", type: "link" },
  { id: 3, title: "Workshop", url: ROUTES.WORKSHOP.WORKSHOP, icon: "knowledgebase", type: "link" },
  { id: 4, title: "Workshop Register", url: ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER, icon: "knowledgebase", type: "link" },
  { id: 5, title: "Courses", url: ROUTES.COURSES.COURSES, icon: "ecommerce", type: "link" },
  { id: 6, title: "Courses Register", url: ROUTES.COURSES_REGISTER.COURSES_REGISTER, icon: "ecommerce", type: "link" },
  { id: 7, title: "Language", url: ROUTES.LANGUAGE.LANGUAGE, icon: "faq", type: "link" },
  { id: 8, title: "Skill Level", url: ROUTES.SKILL_LEVEL.SKILL_LEVEL, icon: "faq", type: "link" },
  { id: 9, title: "What You Learn", url: ROUTES.WHAT_YOU_LEARN.WHAT_YOU_LEARN, icon: "editors", type: "link" },
  { id: 10, title: "Banner", url: ROUTES.BANNER.BANNER, icon: "editors", type: "link" },
  { id: 11, title: "Mentors", url: ROUTES.MENTORS.MENTORS, icon: "editors", type: "link" },
  { id: 12, title: "About", url: ROUTES.ABOUT, icon: "editors", type: "link" },
  { id: 13, title: "Testimonials", url: ROUTES.TESTOMONIALS.TESTOMONIALS, icon: "editors", type: "link" },
  { id: 14, title: "FAQ", url: ROUTES.FAQ.FAQ, icon: "editors", type: "link" },
  { id: 15, title: "Interest", url: ROUTES.INTEREST.INTEREST, icon: "editors", type: "link" },
  { id: 16, title: "Lead Form", url: ROUTES.LEAD_FORM, icon: "editors", type: "link" },
  { id: 17, title: "Coupon Code", url: ROUTES.COUPON_CODE.COUPON_CODE, icon: "editors", type: "link" },
  { id: 18, title: "Web Setting", url: ROUTES.WEB_SETTING, icon: "editors", type: "link" },
  { id: 19, title: "news letter", url: ROUTES.NEWS_LETTER.NEWS_LETTER, icon: "editors", type: "link" },
];

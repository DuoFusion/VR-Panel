import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { ROUTES } from "../constants";
import LoginContainer from "../auth/Login";
import DashboardContainer from "../Pages/dashboard";
import Layout from "../layout";
import ChangePasswordContainer from "../auth/ChangePassword";
import CategoryContainer from "../Pages/category";
import AddEditCategory from "../Pages/category/AddEditCategory";
import Error from "../Pages/error";
import WorkshopContainer from "../Pages/workshop";
import AddEditWorkshop from "../Pages/workshop/AddEditWorkshop";
import CoursesContainer from "../Pages/courses";
import AddEditCourses from "../Pages/courses/AddEditCourses";
import LanguagesContainer from "../Pages/languages";
import AddEditLanguages from "../Pages/languages/AddEditLanguages";
import SkillLevelContainer from "../Pages/SkillLevel";
import AddEditSkillLevel from "../Pages/SkillLevel/AddEditSkillLevel";
import WhatYouLearnContainer from "../Pages/WhatYouLearn";
import AddEditWhatYouLearn from "../Pages/WhatYouLearn/AddEditSkillLevel";
import BannerContainer from "../Pages/banner";
import AddEditBanner from "../Pages/banner/AddEditBanner";
import MentorsContainer from "../Pages/mentors";
import AddEditMentors from "../Pages/mentors/AddEditMentors";
import AboutContainer from "../Pages/about";
import TestomonialsContainer from "../Pages/testomonials";
import AddEditTestomonials from "../Pages/testomonials/AddEditTestomonials";
import FaqContainer from "../Pages/faq";
import AddEditFaq from "../Pages/faq/AddEditFaq";
import LeadFormContainer from "../Pages/leadForm";
import CouponCodeContainer from "../Pages/couponCode";
import AddEditCouponCode from "../Pages/couponCode/AddEditCouponCode";
import InterestContainer from "../Pages/Interest";
import AddEditInterest from "../Pages/Interest/AddEditInterest";
import WebSettingContainer from "../Pages/webSetting";
import WorkshopRegisterContainer from "../Pages/workshopRegister";
import AddEditWorkshopRegister from "../Pages/workshopRegister/AddEditRegister";
import CoursesRegisterContainer from "../Pages/coursesRegister";
import AddEditCoursesRegister from "../Pages/coursesRegister/AddEditCoursesRegister";
import NewsLetterContainer from "../Pages/NewsLetter";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardContainer /> },
          { path: ROUTES.CHANGE_PASSWORD, element: <ChangePasswordContainer /> },

          { path: ROUTES.CATEGORY.CATEGORY, element: <CategoryContainer /> },
          { path: ROUTES.CATEGORY.ADD_EDIT_CATEGORY, element: <AddEditCategory /> },

          { path: ROUTES.WORKSHOP.WORKSHOP, element: <WorkshopContainer /> },
          { path: ROUTES.WORKSHOP.ADD_EDIT_WORKSHOP, element: <AddEditWorkshop /> },

          { path: ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER, element: <WorkshopRegisterContainer /> },
          { path: ROUTES.WORKSHOP_REGISTER.ADD_EDIT_WORKSHOP_REGISTER, element: <AddEditWorkshopRegister /> },

          { path: ROUTES.COURSES.COURSES, element: <CoursesContainer /> },
          { path: ROUTES.COURSES.ADD_EDIT_COURSES, element: <AddEditCourses /> },

          { path: ROUTES.COURSES_REGISTER.COURSES_REGISTER, element: <CoursesRegisterContainer /> },
          { path: ROUTES.COURSES_REGISTER.ADD_EDIT_COURSES_REGISTER, element: <AddEditCoursesRegister /> },

          { path: ROUTES.LANGUAGE.LANGUAGE, element: <LanguagesContainer /> },
          { path: ROUTES.LANGUAGE.ADD_EDIT_LANGUAGE, element: <AddEditLanguages /> },

          { path: ROUTES.SKILL_LEVEL.SKILL_LEVEL, element: <SkillLevelContainer /> },
          { path: ROUTES.SKILL_LEVEL.ADD_EDIT_SKILL_LEVEL, element: <AddEditSkillLevel /> },

          { path: ROUTES.WHAT_YOU_LEARN.WHAT_YOU_LEARN, element: <WhatYouLearnContainer /> },
          { path: ROUTES.WHAT_YOU_LEARN.ADD_EDIT_WHAT_YOU_LEARN, element: <AddEditWhatYouLearn /> },

          { path: ROUTES.BANNER.BANNER, element: <BannerContainer /> },
          { path: ROUTES.BANNER.ADD_EDIT_BANNER, element: <AddEditBanner /> },

          { path: ROUTES.MENTORS.MENTORS, element: <MentorsContainer /> },
          { path: ROUTES.MENTORS.ADD_EDIT_MENTORS, element: <AddEditMentors /> },

          { path: ROUTES.ABOUT, element: <AboutContainer /> },

          { path: ROUTES.TESTOMONIALS.TESTOMONIALS, element: <TestomonialsContainer /> },
          { path: ROUTES.TESTOMONIALS.ADD_EDIT_TESTOMONIALS, element: <AddEditTestomonials /> },

          { path: ROUTES.FAQ.FAQ, element: <FaqContainer /> },
          { path: ROUTES.FAQ.ADD_EDIT_FAQ, element: <AddEditFaq /> },

          { path: ROUTES.LEAD_FORM, element: <LeadFormContainer /> },

          { path: ROUTES.COUPON_CODE.COUPON_CODE, element: <CouponCodeContainer /> },
          { path: ROUTES.COUPON_CODE.ADD_EDIT_COUPON_CODE, element: <AddEditCouponCode /> },

          { path: ROUTES.INTEREST.INTEREST, element: <InterestContainer /> },
          { path: ROUTES.INTEREST.ADD_EDIT_INTEREST, element: <AddEditInterest /> },

          { path: ROUTES.WEB_SETTING, element: <WebSettingContainer /> },

          { path: ROUTES.NEWS_LETTER.NEWS_LETTER, element: <NewsLetterContainer /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.HOME, element: <Navigate to={ROUTES.LOGIN} replace /> },
      { path: ROUTES.LOGIN, element: <LoginContainer /> },
    ],
  },
  { path: "*", element: <Error /> },
]);

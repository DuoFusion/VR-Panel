import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { ROUTES } from "../constants";
import LoginContainer from "../auth/Login";
import DashboardContainer from "../Pages/dashboard";
import Layout from "../layout";
import ChangePasswordContainer from "../auth/ChangePassword";
import Error from "../Pages/error";
import WorkshopContainer from "../Pages/workshop";
import AddEditWorkshop from "../Pages/workshop/AddEditWorkshop";
import CoursesContainer from "../Pages/courses";
import AddEditCourses from "../Pages/courses/AddEditCourses";
import BannerContainer from "../Pages/banner";
import AddEditBanner from "../Pages/banner/AddEditBanner";
import TestomonialsContainer from "../Pages/testomonials";
import AddEditTestomonials from "../Pages/testomonials/AddEditTestomonials";
import FaqContainer from "../Pages/faq";
import AddEditFaq from "../Pages/faq/AddEditFaq";
import WebSettingContainer from "../Pages/webSetting";
import WorkshopRegisterContainer from "../Pages/workshopRegister";
import AddEditWorkshopRegister from "../Pages/workshopRegister/AddEditRegister";
import CoursesRegisterContainer from "../Pages/coursesRegister";
import AddEditCoursesRegister from "../Pages/coursesRegister/AddEditCoursesRegister";
import AchievementsContainer from "../Pages/achievements";
import AddEditAchievements from "../Pages/achievements/AddEditAchievements";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardContainer /> },
          { path: ROUTES.CHANGE_PASSWORD, element: <ChangePasswordContainer /> },

          { path: ROUTES.WORKSHOP.WORKSHOP, element: <WorkshopContainer /> },
          { path: ROUTES.WORKSHOP.ADD_EDIT_WORKSHOP, element: <AddEditWorkshop /> },

          { path: ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER, element: <WorkshopRegisterContainer /> },
          { path: ROUTES.WORKSHOP_REGISTER.ADD_EDIT_WORKSHOP_REGISTER, element: <AddEditWorkshopRegister /> },

          { path: ROUTES.COURSES.COURSES, element: <CoursesContainer /> },
          { path: ROUTES.COURSES.ADD_EDIT_COURSES, element: <AddEditCourses /> },

          { path: ROUTES.COURSES_REGISTER.COURSES_REGISTER, element: <CoursesRegisterContainer /> },
          { path: ROUTES.COURSES_REGISTER.ADD_EDIT_COURSES_REGISTER, element: <AddEditCoursesRegister /> },

          { path: ROUTES.BANNER.BANNER, element: <BannerContainer /> },
          { path: ROUTES.BANNER.ADD_EDIT_BANNER, element: <AddEditBanner /> },

          { path: ROUTES.ACHIEVEMENTS.ACHIEVEMENTS, element: <AchievementsContainer /> },
          { path: ROUTES.ACHIEVEMENTS.ADD_EDIT_ACHIEVEMENTS, element: <AddEditAchievements /> },

          { path: ROUTES.TESTOMONIALS.TESTOMONIALS, element: <TestomonialsContainer /> },
          { path: ROUTES.TESTOMONIALS.ADD_EDIT_TESTOMONIALS, element: <AddEditTestomonials /> },

          { path: ROUTES.FAQ.FAQ, element: <FaqContainer /> },
          { path: ROUTES.FAQ.ADD_EDIT_FAQ, element: <AddEditFaq /> },

          { path: ROUTES.WEB_SETTING, element: <WebSettingContainer /> },
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

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setSideBarToggle } from "../store/slices/LayoutSlice";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const dispatch = useAppDispatch();
  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1200) dispatch(setSideBarToggle(true));
    else dispatch(setSideBarToggle(false));
  };
  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  }, []);

  // useEffect(() => {
  //   const p = (e: any) => {
  //     const k = e.key?.toLowerCase();

  //     // Block: F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  //     if (e.type === "contextmenu" || (e.type === "keydown" && (k === "f12" || (e.ctrlKey && k === "u") || (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k))))) {
  //       e.preventDefault();
  //       message.error("Content is protected");
  //     }
  //   };

  //   for (const evt of ["contextmenu", "keydown"]) {
  //     document.addEventListener(evt, p);
  //   }

  //   return () => {
  //     for (const evt of ["contextmenu", "keydown"]) {
  //       document.removeEventListener(evt, p);
  //     }
  //   };
  // }, []);

  return (
    <div className="page-wrapper compact-wrapper">
      <Header />
      <div className="page-body-wrapper">
        <Sidebar />
        <div className="page-body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

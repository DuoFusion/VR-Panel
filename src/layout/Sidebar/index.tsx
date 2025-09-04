import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ImagePath, ROUTES } from "../../constants";
import SvgIcon from "../../attribute/icons/SvgIcon";
import { toggleSidebar } from "../../store/slices/LayoutSlice";
import { Image } from "../../attribute/image";
import SubMenu from "./SubMenu";
import { useState } from "react";
import { MenuItem } from "../../types";
import { menuList } from "../../data";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);

  const dispatch = useAppDispatch();
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  return (
    <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`} data-layout="stroke-svg">
      <div>
        <div className="logo-wrapper">
          <Link to={ROUTES.DASHBOARD}>
            <h2>HK Lead Course</h2>
          </Link>
          <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
            <SvgIcon className="sidebar-toggle" iconId="toggle-icon" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={ROUTES.DASHBOARD}>
            <h2>HK</h2>
          </Link>
        </div>
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links custom-scrollbar" id="simple-bar">
              <div className="simplebar-wrapper">
                <div className="simplebar-mask">
                  <div className="simplebar-offset">
                    <div className="simplebar-content-wrapper">
                      <div className="simplebar-content">
                        <li className="back-btn">
                          <Link to={ROUTES.DASHBOARD}>
                            <Image className="img-fluid" src={`${ImagePath}logo/logo-icon.png`} alt="logo" />
                          </Link>
                          <div className="mobile-back text-end">
                            <span>Back </span>
                            <i className="fa fa-angle-right ps-2" />
                          </div>
                        </li>
                        <SubMenu menu={menuList} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

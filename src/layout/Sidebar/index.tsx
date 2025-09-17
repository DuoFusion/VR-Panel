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
import SimpleBar from "simplebar-react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);

  const dispatch = useAppDispatch();
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  return (
    <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`} data-layout="stroke-svg">
      <div>
        <div className="logo-wrapper">
          <Link to={ROUTES.DASHBOARD}>
            <Image className="img-fluid for-light" src={`${ImagePath}logo/logo.png`} alt="logo" />
          </Link>
          <div className="back-btn" onClick={() => dispatch(toggleSidebar())}>
            <i className="fa-solid fa-angle-left" />
          </div>
          <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
            <SvgIcon className="sidebar-toggle" iconId="toggle-icon" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={ROUTES.DASHBOARD}>
            <Image className="img-fluid for-light" src={`${ImagePath}logo/logo-icon.png`} alt="logo" />
          </Link>
        </div>
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links custom-scrollbar" id="simple-bar">
              <SimpleBar style={{ width: "68px", height: "350px" }}>
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
              </SimpleBar>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, NavLink, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Href, ImagePath, ROUTES } from "../../constants";
import SvgIcon from "../../attribute/icons/SvgIcon";
import { toggleSidebar } from "../../store/slices/LayoutSlice";
import { logout } from "../../store/slices/AuthSlice";
import { Image } from "../../attribute/image";
import { Maximize2 } from "iconsax-react";

const Header = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) document.documentElement.requestFullscreen();
    else document?.exitFullscreen();
  };

  return (
    <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
      <Row className="header-wrapper m-0">
        <Col className="header-logo-wrapper col-auto p-0">
          <div className="logo-wrapper">
            <Link to={ROUTES.DASHBOARD}>
              <Image className="img-fluid for-light" src={`${ImagePath}logo/logo.png`} alt="logo" />
            </Link>
          </div>
          <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
            <SvgIcon className="sidebar-toggle" iconId="stroke-animation" />
          </div>
        </Col>
        <Col xs="auto" lg="7" md="6" className="nav-right box-col-6 pull-right right-header p-0 ms-auto">
          <ul className="nav-menus">
            <li onClick={() => fullScreenHandler(!fullScreen)}>
              <NavLink href={Href}>
                <Maximize2 />
              </NavLink>
            </li>
            <li className="profile-nav onhover-dropdown p-0 m-0">
              <div className="d-flex profile-media align-items-center">
                <Image className="b-r-6 img-40" src={user?.profilePhoto ? user?.profilePhoto : `${ImagePath}user/user.png`} alt="profile" />
                <div className="flex-grow-1">
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <p className="mb-0 text-capitalize">
                    {user?.userType}
                    <SvgIcon iconId="header-arrow-down" />
                  </p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <Link to={ROUTES.CHANGE_PASSWORD}>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li onClick={() => dispatch(logout())}>
                  <Link to={Href}>
                    <span>LogOut</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Header;

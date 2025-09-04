import { Link } from "react-router-dom";
import { Col, Container } from "reactstrap";
import { ROUTES } from "../../constants";
import { Error404 } from "../../data";

const Error = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <div className="error-wrapper">
        <Container>
          <div className="svg-wrraper">
            <Error404 />
          </div>
          <Col md="8" className="offset-md-2">
            <h3>Internal Server Error</h3>
            <p className="sub-content">{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</p>
            <Link to={ROUTES.DASHBOARD} className="btn btn-primary btn-lg">
              {"BACK TO HOME PAGE"}
            </Link>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default Error;

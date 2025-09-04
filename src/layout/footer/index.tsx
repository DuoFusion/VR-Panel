import { Col, Container, Row } from 'reactstrap'
import SvgIcon from '../../attribute/icons/SvgIcon'

const Footer = () => {
  return (
    <footer className="footer footer-light">
      <Container fluid>
        <Row>
          <Col md="6" className="p-0 footer-copyright">
            <p className="mb-0">Copyright 2025 © Admin theme by pixelstrap</p>
          </Col>
          <Col md="6" className="p-0">
            <p className="float-end mb-0">
              Hand crafted & made with
              <SvgIcon className="svg-color footer-icon ms-1" iconId="heart" />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

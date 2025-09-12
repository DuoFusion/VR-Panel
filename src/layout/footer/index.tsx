import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const Footer = () => {
  return (
    <footer className="footer footer-light">
      <Container fluid>
        <Row>
          <Col md="6" className="p-0 footer-copyright">
            <p className="mb-0">Copyright 2025 © <Link to="https://hkdigiverse.com/" target="_blank"> HK Digiverse & IT Consultancy Pvt Ltd.</Link></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

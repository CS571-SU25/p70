import { Container, Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mt-auto w-100">
      <Container fluid>
        <Navbar.Text>
          &copy; {new Date().getFullYear()} Steam Inventory Viewer
        </Navbar.Text>
        <Nav className="ms-auto">
          <Nav.Link href="/about-us">About Us</Nav.Link>
          <Nav.Link href="/other-info">Other Info</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
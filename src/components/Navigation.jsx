import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 w-100"> {/* Added w-100 */}
      <Container fluid> {/* Must be fluid */}
        <Navbar.Brand as={Link} to="/">Steam Inventory Viewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
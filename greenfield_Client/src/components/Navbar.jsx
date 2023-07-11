import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  function disconnect() {
    localStorage.removeItem("token"); //it just delete token and navigate to "/"
    navigate("/");
  }
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand href="/Home">IMAGES APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">HOME</Nav.Link>
            <Nav.Link href="/upload">UPLOAD</Nav.Link>
            <Nav.Link href="/">LOGIN</Nav.Link>
            <Nav.Link href="/signup">SIGN UP</Nav.Link>
            <Nav.Link onClick={disconnect}>DISCONNECT</Nav.Link>
            {/* <NavDropdown title="IMAGES" id="basic-nav-dropdown">
              <NavDropdown.Item href="/upload">UPLOAD</NavDropdown.Item>
              <NavDropdown.Item href="/Home">HOME</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ImHome3 } from "react-icons/im";
import { HiOfficeBuilding } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

function NavbarPage() {
  return (
    <div className="navbarBtm">
      <Navbar bg="light" variant="light" style={{ paddingBottom: "0px" }}>
        <Container>
          <Nav.Link href="#home" className="iconNavbar">
            <ImHome3 size={20} />
            <p className="">Beranda</p>
          </Nav.Link>
          <Nav.Link href="#link" className="iconNavbar">
            <HiOfficeBuilding size={20} />
            <p className="">Cabang</p>
          </Nav.Link>
          <Nav.Link href="#link" className="iconNavbar">
            <CgProfile size={20} />
            <p className="">Profile</p>
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPage;

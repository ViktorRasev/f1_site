import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from "react-router-dom";


export default function Header() { 

  let navigate = useNavigate()

    return (
        <>
        <Navbar expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("")}>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
         <Nav>
            <Nav.Link onClick={() => navigate("/drivers")}>Drivers</Nav.Link>
            <Nav.Link onClick={() => navigate("/cars")}>Cars</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
      </>
    )
}
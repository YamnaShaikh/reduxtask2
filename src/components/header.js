import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import '../App.css'

const Header = () => {
  return (
    <div className="container">
    <div className="header">
    
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><NavLink to='/'>AddUser</NavLink></Nav.Link>
            <Nav.Link><NavLink to='/userRecords'>UserList</NavLink></Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      </div>
    </div>
  );
};

export default Header;

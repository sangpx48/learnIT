import React, { useContext } from "react";
import Button from "react-bootstrap/Button";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import learnItlogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const NavabarMenu = () => {
  const navigate = useNavigate();
  const { authState, logOutUser } = useContext(AuthContext);
  const { user } = authState;
  const { username } = user;

  const logOut = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <Navbar expand="xl" bg="dark" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItlogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Nav>
        <Nav.Link className="font-weight-bolder text-white" disabled>
          Welcome {username}
        </Nav.Link>
        <Navbar.Brand>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logOut}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Navbar.Brand>
      </Nav>
    </Navbar>
  );
};

export default NavabarMenu;

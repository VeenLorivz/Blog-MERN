import React, { useContext } from "react";
import "./navbar.css";
import { useLocation } from "react-router";
import {
  Navbar,
  Container,
  Nav,
  Image,
  Dropdown,
  SplitButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const NavbarComp = () => {
  const location = useLocation();
  const { user, dispatch } = useContext(Context);
  const PF = "https://lorivzblog.herokuapp.com/images/";

  return (
    <div>
      <Navbar bg="dark" className="navbar-dark shadow-sm fixed-top" expand="md">
        <Container>
          <Link
            className={
              location.pathname === "/" ? "navbar-brand active" : "navbar-brand"
            }
            to="/"
          >
            Lorivz-Blog
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={
                  location.pathname === "/write"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/write"
              >
                Write
              </Link>
              <Link
                className={
                  location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/about"
              >
                About
              </Link>
            </Nav>
            <Nav>
              <Link className="nav-link active" to="/account">
                {user ? (
                  user.profilePic ? (
                    <>
                      <Image
                        src={PF + user.profilePic}
                        roundedCircle
                        style={{ maxWidth: "20px", marginRight: "7px" }}
                      />
                      {user.username}
                    </>
                  ) : (
                    <>
                      <Image
                        src={PF + "avatar.png"}
                        roundedCircle
                        style={{ maxWidth: "20px" }}
                      />
                      {user.username}
                    </>
                  )
                ) : (
                  <Link
                    className={
                      location.pathname === "/login"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;

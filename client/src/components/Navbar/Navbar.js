import React, { useContext } from "react";
import "./navbar.css";
import { useLocation } from "react-router";
import { Navbar, Container, Nav, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const NavbarComp = () => {
  const location = useLocation();
  const { user, dispatch } = useContext(Context);
  const PF = "https://lorivzblog.herokuapp.com/images/";

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <Navbar bg="dark" className="navbar-dark shadow-sm">
        <Container>
          <Link
            className={
              location.pathname === "/" ? "navbar-brand active" : "navbar-brand"
            }
            to="/"
          >
            Lorivz-Blog
          </Link>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-center">
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
                  location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/about"
              >
                About
              </Link>
            </Nav>

            <Nav className="ms-auto">
              {user ? (
                <Dropdown className="ms-auto">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {user.profilePic ? (
                      <Image
                        src={PF + user.profilePic}
                        roundedCircle
                        style={{ maxWidth: "30px" }}
                      />
                    ) : (
                      <Image
                        src={PF + "avatar.png"}
                        roundedCircle
                        style={{ maxWidth: "30px" }}
                      />
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/account">Account</Dropdown.Item>
                    <Dropdown.Item href="/write">Write</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;

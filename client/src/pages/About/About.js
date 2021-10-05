import React from "react";
import "./about.css";
import { Card, Image, Row, Col, Container } from "react-bootstrap";

const About = () => {
  const PF = "https://lorivzblog.herokuapp.com/images/";

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 mt-3 shadow">
          <Card.Body>
            <Row className="justify-content-spacing">
              <Col lg={6} className="d-flex justify-content-center hidden-md">
                <Image
                  src={PF + "about.jpg"}
                  alt="Avatar"
                  id="image"
                  className="rounded-circle shadow-sm"
                  style={{ maxWidth: "300px" }}
                />
              </Col>
              <Col lg={6}>
                <h1 className="text-center display-5 mb-3">About Me</h1>
                <p className="lead mt-5">
                  Hello, my name is Veenlorivz im a student and this blog
                  website is one of my project that i've made. If you think you
                  want to make this website even better you can pull your
                  request in my github
                </p>
                <div className="social-media d-flex justify-content-center">
                  <a
                    className="bg-icon"
                    href="http://instagram.com/rangga.xr"
                    target="blank"
                  >
                    <i className="bi bi-instagram fs-4 me-4"></i>
                  </a>
                  <a
                    className="bg-icon"
                    href="http://github.com/veenlorivz"
                    target="blank"
                  >
                    <i className="bi bi-github fs-4 me-4"></i>
                  </a>
                  <a
                    className="bg-icon"
                    href="http://twitter.com/vnlrz"
                    target="blank"
                  >
                    <i className="bi bi-twitter fs-4 me-4"></i>
                  </a>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default About;

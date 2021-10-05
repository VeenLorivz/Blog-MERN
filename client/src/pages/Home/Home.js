import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/cards";
import "./home.css";
import { Row, Col, Container, Image } from "react-bootstrap";

const Home = () => {
  const PF = "https://lorivzmernblog.herokuapp.com/images/";
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <Row>
        <Col className="jumbotron p-0 shadow-sm">
          <Image
            className="jumbotron-img img-fluid"
            src={PF + "jumbotron.jpg"}
            alt="Jumbotron Image"
          />

          <h1 className="display-5 jumbotron-text">Welcome to Lorivz-Blog</h1>

          <a href="#cards" className="btn btn-dark jumbotron-btn">
            See All Posts
          </a>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col id="cards">
          <Cards />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

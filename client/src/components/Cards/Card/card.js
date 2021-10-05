import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const CardComp = ({ post }) => {
  const PF = "https://lorivzmernblog.herokuapp.com/images/";
  return (
    <div>
      <Link
        className="text-decoration-none text-dark"
        to={`/detail/${post._id}`}
      >
        <Card className="m-2 shadow-sm cardHover p-0">
          <Card.Body>
            <Row>
              <Col lg={4} xs={4}>
                {post.photo && (
                  <Card.Img
                    src={PF + post.photo}
                    className="img-fluid "
                    style={{ minHeight: "100%" }}
                  />
                )}
              </Col>
              <Col lg={8} xs={8}>
                <Card.Title className="fs-4">{post.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted fs-6 fst-italic">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className="lead"
                >
                  {post.desc}
                </Card.Text>
                <Link to={`/detail/${post._id}`}>Continue Reading</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CardComp;

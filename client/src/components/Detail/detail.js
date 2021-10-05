import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { Card, Col, Row, Image, Button, Form } from "react-bootstrap";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

const Detail = () => {
  const location = useLocation();
  const [post, setPost] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "https://lorivzblog.herokuapp.com/images/";

  useEffect(() => {
    const path = location.pathname.split("/");

    axiosInstance.get("/posts/" + path[2]).then((res) => {
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    });
  }, [location.pathname]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      desc,
      username: user.username,
    };

    try {
      await axiosInstance.put(`/posts/${post._id}`, updatedPost);
      setUpdateMode(false);
      // document.getElementById("trix-toolbar-1").remove();
    } catch (error) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete("/posts/" + post._id, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {post && (
        <Row className="justify-content-center">
          <Col lg={8} md={10} xs={10}>
            <article>
              <Card className="mt-3 shadow pb-2">
                <Card.Body>
                  {post.photo && (
                    <Image
                      src={PF + post.photo}
                      alt="Thumbnail"
                      className="img-fluid mb-4"
                      style={{ minWidth: "100%" }}
                    />
                  )}
                  <Card.Title>
                    {updateMode ? (
                      <Form.Control
                        type="text"
                        className="text-center fs-2 fw-light"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                      ></Form.Control>
                    ) : (
                      <>
                        <h1 className="text-center display-6">{title}</h1>
                      </>
                    )}
                    <p className="text-muted text-end fst-italic fw-normal fs-6">
                      {new Date(post.createdAt).toDateString()}
                    </p>
                    <p className=" text-muted  fst-italic fw-normal fs-6">
                      Author : {post.username}
                    </p>
                  </Card.Title>
                  {user && user.username === post.username && (
                    <div className="edit-delete-badges text-end my-3">
                      <Button
                        variant="warning me-2"
                        size="sm"
                        onClick={() => setUpdateMode(true)}
                      >
                        <i className="bi bi-pencil-fill text-white"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={handleDelete}>
                        <i className="bi bi-trash text-white"></i>
                      </Button>
                    </div>
                  )}

                  {updateMode ? (
                    <div className="my-3">
                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={8}
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </Form.Group>
                      <Button onClick={handleUpdate}>Submit</Button>
                    </div>
                  ) : (
                    <div className="lead mb-3">
                      {parse(`<div/>${desc}<div/>`)}
                    </div>
                  )}

                  <Link to="/">&laquo; Back To All Post</Link>
                </Card.Body>
              </Card>
            </article>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Detail;

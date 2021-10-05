import React, { useContext, useState } from "react";
import { Button, Form, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

const Write = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState();
  const [error, setError] = useState(false);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
      username: user.username,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/detail/" + res.data._id);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Col md={8} xs={8}>
          <h1 className="display-5 text-center my-4">Write Post</h1>
          <Form onSubmit={handleSubmit}>
            {file ? (
              <div>
                <Image
                  className="m-3 img-fluid"
                  src={URL.createObjectURL(file)}
                  alt="Thumbnail"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            ) : (
              <Form.Label
                htmlFor="fileInput"
                style={{ cursor: "pointer" }}
                className="d-block mb-3 ms-1"
              >
                <h3 className="bi bi-plus-circle">
                  <span className="h5 fw-normal ms-2 text-danger">
                    Thumbnail Required !
                  </span>
                </h3>
              </Form.Label>
            )}
            <Form.Control
              type="file"
              id="fileInput"
              placeholder="Title"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FloatingLabel label="Title" className="mb-5">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Body"
                rows={8}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3 d-block">
              Add Post
            </Button>
            {error && (
              <Form.Text className="text-danger fw-bold d-block ">
                Invalid Post !
              </Form.Text>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Write;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  FloatingLabel,
  Card,
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const UpdateAccount = () => {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const PF = "https://lorivzblog.herokuapp.com/images/";

  useEffect(() => {
    try {
      axiosInstance.get("/users/" + user._id).then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
        setPassword(res.data.password);
      });
    } catch (error) {}
  }, [user._id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axiosInstance.put(`/users/${user._id}`, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.replace("/account");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILED" });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Col xs={8} lg={8}>
          <Card className="mt-3 shadow">
            <Card.Title>
              <h1 className="display-6 text-center">Account</h1>
            </Card.Title>
            <Card.Body>
              <Form>
                <Image
                  src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                  rounded
                  style={{ maxWidth: "80px" }}
                  className="border border-1"
                />

                <Form.Label
                  htmlFor="fileInput"
                  style={{ cursor: "pointer" }}
                  className=""
                >
                  <h6 className="bi bi-pencil">
                    <span className="h6 fw-normal ms-2">Edit Picture</span>
                  </h6>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="fileInput"
                  placeholder="Title"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <FloatingLabel label="Username" className="my-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
                <Button variant="primary" onClick={handleUpdate}>
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="mx-2"
                >
                  Logout
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateAccount;

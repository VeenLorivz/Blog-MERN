import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, FloatingLabel, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const Login = ({ error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED" });
      setErr(true);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 className="display-5 text-center my-4">Login</h1>
      <Row className="justify-content-center text-center">
        <Col md={6} xs="6">
          {error && (
            <Alert variant="danger" className="pb-0">
              <p>You Have To Login First</p>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <Form.Control type="text" placeholder="Username" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <Form.Text className="text-muted d-block ">
                Do Not have Account ? <Link to="/register">Register </Link>
                Here
              </Form.Text>
            </>

            <Button variant="success" type="submit" className="mt-3">
              Submit
            </Button>
            {err && (
              <Form.Text className="text-danger fw-bold d-block ">
                Wrong Credentials !
              </Form.Text>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

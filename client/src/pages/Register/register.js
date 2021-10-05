import React, { useState } from "react";
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        profilePic: "avatar.png",
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 className="display-5 text-center my-4">Register</h1>
      <Row className="justify-content-center text-center">
        <Col md={6} xs="6">
          <Form onSubmit={handleSubmit}>
            <>
              <FloatingLabel label="Username" className="mb-3">
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
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <Form.Text className="text-muted d-block ">
                Already have Account ? <Link to="/login">Login</Link>
              </Form.Text>
            </>
            {error && (
              <p className="text-danger mt-3">Something Went Wrong !</p>
            )}

            <Button variant="success" type="submit" className="mt-1">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;

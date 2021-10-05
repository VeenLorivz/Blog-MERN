import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import Card from "./Card/card";
import Loader from "../Loader/Loader";
import { axiosInstance } from "../../config";

const Cards = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    axiosInstance.get("/posts" + search).then((res) => {
      const data = res.data;
      setPosts(data);
      setLoading(false);
    });
  }, [location]);

  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          posts.map((post) => {
            return (
              <Col xs={12} md={12} lg={6} key={post._id}>
                <Card post={post} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

export default Cards;

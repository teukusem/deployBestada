import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

function CardComponent(props) {
  const navigate = useNavigate();

  let { data: dataKeluhan = [], isLoading } = useQuery(
    ["dataCache"],
    async () => {
      const response = await axios.get(
        `http://34.101.70.83:5200/mobile/user/v1/ticket/`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "l!nt@h-B@!k",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.data;
    },
    {
      retry: false,
    }
  );

  return (
    <>
      <Card className="mb-2">
        <Card.Body style={{ paddingBottom: "0px" }}>
          <Card.Title>Keluhan</Card.Title>
          <Row className="d-flex">
            <Col>
              <Card.Text>{props.title}</Card.Text>
            </Col>
            <Col className="d-flex">
              <Card.Text style={{ color: "#FAD24D" }}>{props.status}</Card.Text>
              <IoIosArrowDropright
                className="ms-auto"
                size={28}
                style={{ color: "#47ade7" }}
                onClick={() => navigate("/detail?id=" + props.id)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardComponent;

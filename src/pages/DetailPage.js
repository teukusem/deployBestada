import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import IconWa from "../assets/Image/Iconwa.png";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

function DetailPage() {
  document.title = `ZidDesk | Form Detail`;

  const navigate = useNavigate();

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  let { data = [], isLoading } = useQuery(["detailCache"], async () => {
    const response = await axios.get(
      `http://34.101.70.83:5200/mobile/user/v1/ticket/?_id=${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": "l!nt@h-B@!k",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.data;
  });

  return (
    <div className="mb-3">
      <Container className="d-flex mt-2">
        <BsArrowLeftShort size={30} onClick={() => navigate("/keluhan-saya")} />
        <h5 className="fw-bold ms-2">Detail Keluhan</h5>
      </Container>
      <Container>
        <Card style={{ width: "100%" }} className="mt-3">
          <img
            crossOrigin="anonymous"
            src={data.image_url}
            style={{ padding: "10px" }}
            alt="Image.png"
          />
          <Card.Body>
            <Card.Title>Keluhan</Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>{data.title}</Card.Text>
            <div className="borderBottom mb-3"></div>

            <Card.Title>Deskripsi</Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>
              {data.description}
            </Card.Text>
            <div className="borderBottom mb-3"></div>

            <Card.Title>Kategori</Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>{data.category}</Card.Text>
            <div className="borderBottom mb-3"></div>

            <Card.Title>Status</Card.Title>
            <Card.Text style={{ fontSize: "14px", color: "#FAD24D" }}>
              {data.status}
            </Card.Text>
            <div className="borderBottom mb-3"></div>

            <Card.Title>Konsultasi Via</Card.Title>
            <Row className="text-center">
              <Col>
                <a href="tel:+6285268083758" style={{ textDecoration: "none" }}>
                  <Button className="btnDetail px-4 d-flex ">
                    <IoIosCall className="mt-1" />
                    <div className="ms-1"> Phone</div>
                  </Button>
                </a>
              </Col>
              <Col>
                <a
                  href="https://wa.me/6285268083758"
                  style={{ textDecoration: "none" }}
                >
                  <Button className="btnDetail px-4 d-flex ">
                    <img src={IconWa} className="mt-1" alt="Image.png" />
                    <div className="ms-1">Whatsapp</div>
                  </Button>
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DetailPage;

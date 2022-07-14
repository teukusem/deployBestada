import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import TicketImage from "../assets/Image/Ticket.png";
import BagImage from "../assets/Image/Bag.png";
import Worker from "../assets/Image/Worker.png";
import Keluhan from "../assets/Image/Keluhan.png";
import CardComponent from "../component/Card/Card";
import { useNavigate } from "react-router-dom";
import NavbarTab from "../component/Navbar/Navbar";
import { useQuery } from "react-query";
import axios from "axios";

function Home({ setToken }) {
  const title = "Home";
  document.title = `ZidDesk | ${title}`;

  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  let { data: dataKeluhan = [], isLoading } = useQuery(
    ["dataCache", limit],
    async () => {
      const response = await axios.get(
        `http://34.101.70.83:5200/mobile/user/v1/ticket/?limit=${limit}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "l!nt@h-B@!k",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.data;
    }
  );

  const handleLogout = () => {
    setToken(undefined);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <div className="bgHome">
        <Container>
          <div className="text-light d-flex align-items-center pt-3">
            <span className="fontNav fw-500">ZidDesk</span>
            <div className="ms-auto">
              <BsBell size={25} className="ms-auto me-3" />
              <BiLogOut size={25} className="ms-auto" onClick={handleLogout} />
            </div>
          </div>
          <div className="placeName text-light">
            <p className="fw-400 mt-5">PT. BESTADA (Pusat)</p>
            <p>
              <FaMapMarkerAlt />
              <span className="ms-1">Jakarta</span>
            </p>
            <Card>
              <Card.Body>
                <Row className="text-dark">
                  <Col className="d-flex justify-content-center borderRight">
                    <img
                      src={TicketImage}
                      width={30}
                      height={25}
                      alt="Image.png"
                    />
                    <h6 className="cardText ms-2 mt-1">5 Ticket</h6>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <img
                      src={BagImage}
                      width={30}
                      height={21}
                      alt="Image.png"
                    />

                    <h6 className="cardText2 ms-2 mt-1">3 Visit</h6>
                  </Col>
                </Row>
              </Card.Body>
              <p className="textLimit text-dark mt-1">
                <span className="spanLimit">Akan berakhir pada:</span> 17
                Agustus 2022
              </p>
            </Card>
          </div>

          <Row className="mt-3">
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <Card.Title
                    className="cardReport"
                    onClick={() => navigate("/form-keluhan")}
                  >
                    <img src={Worker} alt="Image.png" />
                    <p className="cardLaporan mt-3">Lapor Keluhan</p>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <Card.Title
                    className="cardReport"
                    onClick={() => navigate("/keluhan-saya")}
                  >
                    <img src={Keluhan} alt="Image.png" />
                    <p className="cardLaporan mt-3">Keluhan Saya</p>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="d-flex mt-1">
            <p className="fw-bold">Aktivitas Terbaru</p>
            <p
              className="ms-auto"
              style={{ color: " #47ade7" }}
              onClick={() => setLimit(100)}
            >
              Lihat Semua
            </p>
          </div>
          <Row style={{ minHeight: "40vh" }}>
            <Col style={{ marginBottom: "80px" }}>
              {dataKeluhan.map((item) => {
                return (
                  <CardComponent
                    title={item.title}
                    status={item.status}
                    id={item._id}
                  />
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
      <NavbarTab />
    </div>
  );
}

export default Home;

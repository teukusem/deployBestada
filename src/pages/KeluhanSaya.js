import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import BadgePage from "../component/Badge/Badge";
import { data } from "../component/DummyData";
import CardInfo from "../component/Card/CardInfoSaya";
import dataKosong from "../assets/Image/Gagal.jpg";
import { useQuery } from "react-query";
import axios from "axios";

function KeluhanSaya() {
  document.title = `ZidDesk | List Keluhan`;

  const navigate = useNavigate();
  const [statusKey, setStatusKey] = useState("");

  let { data: dataKeluhan = [], isLoading } = useQuery(
    ["dataCache", statusKey],
    async () => {
      const response = await axios.get(
        `http://34.101.70.83:5200/mobile/user/v1/ticket/?status=${statusKey}`,
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

  return (
    <div className="mb-3">
      <Container className="d-flex mt-2">
        <BsArrowLeftShort size={30} onClick={() => navigate("/")} />
        <h5 className="fw-bold ms-2">Keluhan Saya</h5>
      </Container>
      <Container>
        <div className="d-flex">
          {data.map((item) => {
            return (
              <BadgePage
                status={item.status}
                onClick={() => setStatusKey(item.key)}
              />
            );
          })}
        </div>
        {dataKeluhan.length > 0 ? (
          dataKeluhan.map((item) => {
            return (
              <CardInfo
                status={item.status}
                title={item.title}
                image_url={item.image_url}
                description={item.description}
                onClick={() => navigate("/detail?id=" + item._id)}
              />
            );
          })
        ) : (
          <div className="noDataImage">
            <img src={dataKosong} alt="Image.png" />
            <p className="text-center mt-3 fw-bold sizeInfo">Data Kosong</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default KeluhanSaya;

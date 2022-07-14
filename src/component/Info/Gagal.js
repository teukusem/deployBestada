import React from "react";
import GagalImage from "../../assets/Image/Gagal.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Gagal() {
  const navigate = useNavigate();
  return (
    <div className="infoComponent">
      <img src={GagalImage} />

      <p className="text-center mt-3 fw-bold sizeInfo">
        Request tidak terkirim karena terjadi <br /> kesalahan. Silakan hubungi
        kami.
      </p>
      <Button
        variant="info"
        style={{ color: "#47ADE7" }}
        className="fw-bold"
        onClick={() => navigate("/")}
      >
        Hubungi Kami
      </Button>
    </div>
  );
}

export default Gagal;

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BerhasilImage from "../../assets/Image/Berhasil.png";

function Berhasil() {
  const navigate = useNavigate();
  return (
    <div className="infoComponent">
      <img src={BerhasilImage} />

      <p className="text-center mt-3 fw-bold sizeInfo">
        Request kamu telah dikirim, harap <br /> menunggu balasan dari kami
      </p>
      <Button
        variant="info"
        style={{ color: "#47ADE7" }}
        className="fw-bold"
        onClick={() => navigate("/")}
      >
        Kembali
      </Button>
    </div>
  );
}

export default Berhasil;

import React from "react";
import { Card } from "react-bootstrap";

function CardInfoSaya(props) {
  return (
    <>
      <Card
        style={{ width: "100%", cursor: "pointer" }}
        className="mt-3"
        onClick={props.onClick}
      >
        <img crossOrigin="anonymous" src={props.image_url} alt="Image.png" />
        <Card.Body>
          <p style={{ marginBottom: "0px", fontSize: "12px", color: "grey" }}>
            <span style={{ color: "#FAD24D" }}>{props.status}</span>{" "}
            {`· Komputer dan Laptop · 13 Juli 2021`}
          </p>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ fontSize: "12px" }}>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardInfoSaya;

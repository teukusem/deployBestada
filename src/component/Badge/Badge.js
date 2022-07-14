import React from "react";
import { Badge } from "react-bootstrap";

function BadgePage(props) {
  return (
    <div>
      <Badge
        pill
        bg="light"
        className="badgeTag text-info me-2 mt-3"
        onClick={props.onClick}
      >
        {props.status}
      </Badge>
    </div>
  );
}

export default BadgePage;

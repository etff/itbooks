import React from "react";
import { Link } from "react-router-dom";
import { Col, Space } from "antd";

function GridCards(props) {
  return (
    <Col lg={3} md={8} xs={24}>
      <Link to={`/book/${props.bookId}`}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.title}
          />
          <Space>{props.title}</Space>
        </div>
      </Link>
    </Col>
  );
}

export default GridCards;

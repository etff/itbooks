import React from "react";
import { Link } from "react-router-dom";
import { Col, Space } from "antd";

function GridCards(props) {
  if (props.mainPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <Link to={`/book/${props.bookId}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.title}
            />
            <Space>
              {props.title} | {props.author}
            </Space>
          </div>
        </Link>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.title}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;

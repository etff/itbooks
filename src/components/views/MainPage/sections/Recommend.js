import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Carousel, Typography, Row, Space } from "antd";

const { Paragraph, Title } = Typography;

function Recommend() {
  const [items, setItems] = useState([]);
  const [ellipsis, setEllipsis] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("api/v1/books/recommend");
      setItems(result.data.item);
    };
    fetchData();
  }, []);

  const Content = ({ children, extraContent }) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div>{extraContent}</div>
    </Row>
  );

  return (
    <Carousel
      autoplay
      style={{
        background: "#e0eaf4",
        height: "300px",
        overflow: "scroll",
      }}
    >
      {items &&
        items.map((item, index) => (
          <Content
            extraContent={
              <img src={item.coverSmallUrl} alt={item.title} width="100%" />
            }
            key={item.itemId}
          >
            <>
              <Title>{item.title}</Title>
              <Title level={5}>
                <Space>
                  {item.author} | {item.publisher}
                </Space>
              </Title>
              <Paragraph
                ellipsis={
                  ellipsis
                    ? {
                        rows: 5,
                        expandable: true,
                        symbol: "more",
                      }
                    : false
                }
              >
                {item.description}
              </Paragraph>
            </>
          </Content>
        ))}
    </Carousel>
  );
}

export default Recommend;

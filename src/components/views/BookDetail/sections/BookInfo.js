import React from "react";
import { Descriptions, Space, Typography } from "antd";
import styled from "styled-components";

const Item = styled.span`
  color: white;
`;

function BookInfo(props) {
  const { book } = props;

  return (
    <Descriptions bordered style={{ opacity: 0.7 }}>
      <Descriptions.Item label="제목">
        <Item>{book.title}</Item>
      </Descriptions.Item>
      <Descriptions.Item label="출판연도">
        <Item>{book.pubDate ? book.pubDate.substring(0, 4) : pubDate}</Item>
      </Descriptions.Item>
      <Descriptions.Item label="저자">
        <Item>{book.author}</Item>
      </Descriptions.Item>
      <Descriptions.Item label="isbn">
        <Item>{book.isbn}</Item>
      </Descriptions.Item>
      <Descriptions.Item label="사용자리뷰 점수" span={2}>
        <Item>
          <Space>
            {book.customerReviewRank > 0
              ? `⭐️ ${book.customerReviewRank} / 10`
              : ""}
          </Space>
        </Item>
      </Descriptions.Item>
    </Descriptions>
  );
}

export default BookInfo;

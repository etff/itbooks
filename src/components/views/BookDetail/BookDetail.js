import React, { useEffect, useState } from "react";
import { Space, Empty, Typography } from "antd";
import axios from "axios";
import styled from "styled-components";
import BookInfo from "./sections/BookInfo";
import Loader from "../commons/Loader";

import Helmet from "react-helmet";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 50%;
  margin-bottom: 20px;
  overflow: scroll;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

function BookDetail(props) {
  const bookId = props.match.params.bookId;
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/v1/books/${bookId}`);
      setBook(result.data.item[0]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <Helmet>
            <title>Loading</title>
          </Helmet>
          <Loader />
        </>
      ) : (
        <Container>
          <Helmet>
            <title>{book.title}</title>
          </Helmet>

          <Content>
            <Cover
              bgImage={book.coverLargeUrl ? book.coverLargeUrl : <Empty />}
            />
            <Data>
              <Title style={{ color: "white" }}>{book.title}</Title>
              <ItemContainer>
                <Space>
                  {book.author} | {book.publisher} |{" "}
                  <a
                    href={`https://book.naver.com/search/search.nhn?serviceSm=advbook.basic&ic=service.summary&isbn=${book.isbn}`}
                  >
                    링크
                  </a>
                </Space>
              </ItemContainer>
              <Overview>{book.description}</Overview>
            </Data>
          </Content>
          <BookInfo book={book} />
        </Container>
      )}
    </div>
  );
}

export default BookDetail;

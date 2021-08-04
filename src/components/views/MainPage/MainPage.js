import React, { useEffect, useState } from "react";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Helmet from "react-helmet";
import axios from "axios";
import Loader from "../commons/Loader";
import Recommend from "./sections/Recommend";
import styled from "styled-components";

const Subject = styled.h2`
  margin: 1rem auto;
  color: white;
`;

function MainPage() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const popularResult = await axios("api/v1/books/popular");
      const newBookResults = await axios("api/v1/books/new");
      setPopularBooks(popularResult.data.item);
      setNewBooks(newBookResults.data.item);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <title>Loading</title>
          </Helmet>
          <Loader />{" "}
        </>
      ) : (
        <div style={{ width: "100%", margin: "0" }}>
          <div style={{ width: "90%", margin: "1rem auto" }}>
            <Helmet>
              <title>Home</title>
            </Helmet>
            <Recommend />

            <Subject>IT 부분 베스트 셀러</Subject>
            <hr />
            <Row gutter={[16, 16]}>
              {popularBooks &&
                popularBooks.map((book, index) => (
                  <React.Fragment key={book.isbn}>
                    <GridCards
                      mainPage
                      image={book.coverLargeUrl ? book.coverLargeUrl : null}
                      bookId={book.isbn}
                      title={book.title}
                      author={book.author}
                    />
                  </React.Fragment>
                ))}
            </Row>
            <Subject>IT 신간</Subject>
            <hr />
            <Row gutter={[16, 16]}>
              {newBooks &&
                newBooks.map((book, index) => (
                  <React.Fragment key={book.isbn}>
                    <GridCards
                      mainPage
                      image={book.coverLargeUrl ? book.coverLargeUrl : null}
                      bookId={book.isbn}
                      title={book.title}
                      author={book.author}
                    />
                  </React.Fragment>
                ))}
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;

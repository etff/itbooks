import React, { useEffect, useState } from "react";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Helmet from "react-helmet";
import axios from "axios";

function MainPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //const endpoint = `api/v1/books/popular`;
    axios.get("api/v1/books/popular").then((response) => {
      setBooks([...books, ...response.data.item]);
    });
  }, [books]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div style={{ width: "100%", margin: "0" }}>
        <div style={{ width: "90%", margin: "1rem auto" }}>
          <h2 style={{ color: "white" }}>IT 부분 베스트 셀러</h2>
          <hr />
          <Row gutter={[16, 16]}>
            {books &&
              books.map((book, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    mainPage
                    image={book.coverLargeUrl ? book.coverLargeUrl : null}
                    bookId={book.itemId}
                    title={book.title}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default MainPage;

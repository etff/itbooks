import React, { useEffect, useState } from "react";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Helmet from "react-helmet";
import axios from "axios";
import Loader from "../commons/Loader";
import Recommend from "./sections/Recommend";

function MainPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("api/v1/books/popular");
      setBooks(result.data.item);
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

            <h2 style={{ color: "white", margin: "1rem auto" }}>
              IT 부분 베스트 셀러
            </h2>
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

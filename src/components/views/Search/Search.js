import React, { useState, useEffect } from "react";
import GridCards from "../commons/GridCards";
import styled from "styled-components";
import { Row, Button } from "antd";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../commons/Loader";
import Message from "../commons/Message";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 30px;
  width: 100%;
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchBooks(searchTerm, index);
  };

  const loadMoreItems = () => {
    fetchBooks(searchTerm, index);
  };

  const fetchBooks = async (searchTerm, currentIndex) => {
    if (searchTerm !== "") {
      setLoading(true);

      try {
        const { data: searchResult } = await axios(`/api/v1/books/search`, {
          params: {
            query: searchTerm,
            index: currentIndex,
            maxResults: 8,
          },
        });
        const { item: booksArray } = searchResult;
        setBooks([...books, ...booksArray]);
        setIndex(index + 1);
      } catch {
        setError("조회 결과가 없습니다");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  return (
    <Container>
      <Helmet>
        <title>Search </title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {books && books.length > 0 && (
            <Row gutter={[16, 16]}>
              {books &&
                books.map((book, index) => (
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
          )}

          {error && <Message color="#e74c3c" text={error} />}
          {books && books.length > 0 && (
            <LoadMore>
              <Button type="primary" onClick={loadMoreItems}>
                더보기
              </Button>
            </LoadMore>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;

import React, { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

export default () => (
  <Container>
    <HashLoader color={"4A90E2"} size={150} />
  </Container>
);

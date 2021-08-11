import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#f0f8ff" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  display: inline-block;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const PrimaryNav = styled.ul`
  margin: 0;
  padding: 80;
  list-style: none;
`;

const RightMenu = styled.ul`
  padding: 0 60px;
`;

export default withRouter(({ location: { pathname } }) => (
  <NavContainer>
    <PrimaryNav>
      <Item current={pathname === "/"}>
        <SLink to="/">Books</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </PrimaryNav>
    <RightMenu>
      <Item current={pathname === "/login"}>
        <SLink to="/">Login</SLink>
      </Item>
      <Item current={pathname === "/signup"}>
        <SLink to="/signup">Signup</SLink>
      </Item>
    </RightMenu>
  </NavContainer>
));

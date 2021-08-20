import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/userAction";

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
  padding: 5%;
`;
const Header = ({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const onLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  return (
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
        {user.userData && !user.userData.auth ? (
          <>
            <Item current={pathname === "/login"}>
              <SLink to="/login">Login</SLink>
            </Item>
            <Item current={pathname === "/register"}>
              <SLink to="/register">Register</SLink>
            </Item>
          </>
        ) : (
          <Item current={pathname === "/logout"}>
            <SLink onClick={onLogout} to="#">
              Logout
            </SLink>
          </Item>
        )}
      </RightMenu>
    </NavContainer>
  );
};

export default withRouter(Header);
